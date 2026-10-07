import { createClient } from "jsr:@supabase/supabase-js@2.49.8"
import { Hono } from "npm:hono"
import { cors } from "npm:hono/cors"
import { deleteCookie, getCookie, setCookie } from "npm:hono/cookie"
import { logger } from "npm:hono/logger"
import * as kv from "./kv_store.tsx"

const app = new Hono()
const tableName = "kv_store_61bf5cd2"
const sessionCookie = "cultiva_session"
const sessionDurationSeconds = 60 * 60 * 24 * 30

app.use("*", logger(console.log))
app.use(
  "/*",
  cors({
    origin: (origin) => origin,
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    credentials: true,
    maxAge: 600,
  }),
)

const adminClient = () =>
  createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  )

const encoder = new TextEncoder()

function bytesToHex(bytes: ArrayBuffer | Uint8Array) {
  return Array.from(new Uint8Array(bytes))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("")
}

function randomToken(byteLength = 32) {
  const bytes = crypto.getRandomValues(new Uint8Array(byteLength))
  return btoa(String.fromCharCode(...bytes))
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replaceAll("=", "")
}

async function sha256(value: string) {
  return bytesToHex(
    await crypto.subtle.digest("SHA-256", encoder.encode(value)),
  )
}

async function hashPassword(password: string, saltHex: string) {
  const passwordKey = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    "PBKDF2",
    false,
    ["deriveBits"],
  )
  const salt = new Uint8Array(
    saltHex.match(/.{1,2}/g)?.map((byte) => Number.parseInt(byte, 16)) ?? [],
  )
  const bits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      hash: "SHA-256",
      salt,
      iterations: 210_000,
    },
    passwordKey,
    256,
  )
  return bytesToHex(bits)
}

function safeProfile(account: Record<string, unknown>) {
  return {
    userId: account.userId,
    username: account.username,
    fullName: account.fullName,
    location: account.location,
    role: account.role,
    createdAt: account.createdAt,
  }
}

function normalizeUsername(value: unknown) {
  return typeof value === "string" ? value.trim().toLowerCase() : ""
}

async function createSession(c: any, account: Record<string, unknown>) {
  const token = randomToken()
  const tokenHash = await sha256(token)
  const expiresAt = new Date(
    Date.now() + sessionDurationSeconds * 1000,
  ).toISOString()
  await kv.set(`auth:session:${tokenHash}`, {
    userId: account.userId,
    username: account.username,
    expiresAt,
  })
  setCookie(c, sessionCookie, token, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    path: "/",
    maxAge: sessionDurationSeconds,
  })
}

async function currentAccount(c: any) {
  const token = getCookie(c, sessionCookie)
  if (!token) return null

  const tokenHash = await sha256(token)
  const session = await kv.get(`auth:session:${tokenHash}`)
  if (!session || new Date(session.expiresAt).getTime() <= Date.now()) {
    await kv.del(`auth:session:${tokenHash}`)
    return null
  }

  return kv.get(`auth:user:${session.username}`)
}

app.get("/make-server-61bf5cd2/health", (c) => {
  return c.json({ status: "ok" })
})

app.post("/make-server-61bf5cd2/auth/register", async (c) => {
  try {
    const body = await c.req.json()
    const username = normalizeUsername(body.username)
    const password = typeof body.password === "string" ? body.password : ""
    const fullName =
      typeof body.fullName === "string" ? body.fullName.trim() : ""
    const location =
      typeof body.location === "string" ? body.location.trim() : ""

    if (!/^[a-z0-9_]{3,24}$/.test(username)) {
      return c.json(
        {
          error:
            "Username must be 3–24 characters using letters, numbers, or underscores.",
        },
        400,
      )
    }
    if (password.length < 8 || password.length > 128) {
      return c.json(
        { error: "Password must contain at least 8 characters." },
        400,
      )
    }
    if (fullName.length < 2 || fullName.length > 160) {
      return c.json({ error: "Please enter your full name." }, 400)
    }

    const salt = bytesToHex(crypto.getRandomValues(new Uint8Array(16)))
    const account = {
      userId: crypto.randomUUID(),
      username,
      fullName,
      location: location.slice(0, 255),
      role: "farmer",
      passwordHash: await hashPassword(password, salt),
      passwordSalt: salt,
      createdAt: new Date().toISOString(),
    }

    const { error } = await adminClient()
      .from(tableName)
      .insert({
        key: `auth:user:${username}`,
        value: account,
      })
    if (error?.code === "23505") {
      return c.json({ error: "That username is already taken." }, 409)
    }
    if (error) throw new Error(error.message)

    await createSession(c, account)
    return c.json({ profile: safeProfile(account) }, 201)
  } catch (error) {
    console.error(
      "Registration error",
      error instanceof Error ? error.message : "Unknown error",
    )
    return c.json({ error: "Unable to create the farmer account." }, 500)
  }
})

app.post("/make-server-61bf5cd2/auth/login", async (c) => {
  try {
    const body = await c.req.json()
    const username = normalizeUsername(body.username)
    const password = typeof body.password === "string" ? body.password : ""
    const account = await kv.get(`auth:user:${username}`)

    if (!account || !password) {
      return c.json({ error: "Incorrect username or password." }, 401)
    }

    const passwordHash = await hashPassword(password, account.passwordSalt)
    if (passwordHash !== account.passwordHash) {
      return c.json({ error: "Incorrect username or password." }, 401)
    }

    await createSession(c, account)
    return c.json({ profile: safeProfile(account) })
  } catch (error) {
    console.error(
      "Login error",
      error instanceof Error ? error.message : "Unknown error",
    )
    return c.json({ error: "Unable to sign in right now." }, 500)
  }
})

app.get("/make-server-61bf5cd2/auth/me", async (c) => {
  try {
    const account = await currentAccount(c)
    if (!account) return c.json({ error: "No active session." }, 401)
    return c.json({ profile: safeProfile(account) })
  } catch (error) {
    console.error(
      "Profile lookup error",
      error instanceof Error ? error.message : "Unknown error",
    )
    return c.json({ error: "Unable to load the farmer profile." }, 500)
  }
})

app.patch("/make-server-61bf5cd2/auth/profile", async (c) => {
  try {
    const account = await currentAccount(c)
    if (!account) return c.json({ error: "No active session." }, 401)

    const body = await c.req.json()
    const fullName =
      typeof body.fullName === "string" ? body.fullName.trim() : ""
    const location =
      typeof body.location === "string" ? body.location.trim() : ""
    if (fullName.length < 2 || fullName.length > 160) {
      return c.json({ error: "Please enter your full name." }, 400)
    }

    const updatedAccount = {
      ...account,
      fullName,
      location: location.slice(0, 255),
    }
    await kv.set(`auth:user:${account.username}`, updatedAccount)
    return c.json({ profile: safeProfile(updatedAccount) })
  } catch (error) {
    console.error(
      "Profile update error",
      error instanceof Error ? error.message : "Unknown error",
    )
    return c.json({ error: "Unable to update the farmer profile." }, 500)
  }
})

app.post("/make-server-61bf5cd2/auth/logout", async (c) => {
  try {
    const token = getCookie(c, sessionCookie)
    if (token) {
      await kv.del(`auth:session:${await sha256(token)}`)
    }
    deleteCookie(c, sessionCookie, {
      path: "/",
      secure: true,
      sameSite: "None",
    })
    return c.json({ success: true })
  } catch (error) {
    console.error(
      "Logout error",
      error instanceof Error ? error.message : "Unknown error",
    )
    return c.json({ error: "Unable to sign out." }, 500)
  }
})

const systemInstruction = `You are Cultiva AI, an expert enterprise agronomist and crop specialist for Cultiva Health.
Give specific, practical guidance for the farmer's exact crop issue. Never use a generic template response.

For every response:
- Explain symptom patterns and the most likely causes without overstating certainty.
- Give concrete field checks that help distinguish between likely causes.
- Give separate immediate organic and chemical actions. If no chemical is appropriate, say so clearly.
- Give preventative steps.
- Use professional, encouraging, plain language.
- Do not invent application rates. Recommend rates only when the farmer provides enough crop, area, formulation, soil-test, and location context.
- Recommend only locally registered products, label compliance, PPE, pre-harvest intervals, pollinator protection, and local agronomist or extension confirmation where relevant.
- If evidence is insufficient, identify the exact missing evidence rather than pretending to diagnose.
- Treat uploaded images as supporting evidence, not definitive laboratory confirmation.

Return only valid JSON matching the requested schema.`

const responseSchema = {
  type: "OBJECT",
  properties: {
    diagnosis: { type: "STRING" },
    summary: { type: "STRING" },
    urgency: { type: "STRING" },
    checks: {
      type: "ARRAY",
      items: { type: "STRING" },
      minItems: 3,
      maxItems: 4,
    },
    organic: { type: "STRING" },
    chemical: { type: "STRING" },
    prevention: {
      type: "ARRAY",
      items: { type: "STRING" },
      minItems: 3,
      maxItems: 4,
    },
  },
  required: [
    "diagnosis",
    "summary",
    "urgency",
    "checks",
    "organic",
    "chemical",
    "prevention",
  ],
}

app.post("/make-server-61bf5cd2/agronomy/chat", async (c) => {
  try {
    const apiKey = Deno.env.get("GEMINI_API_KEY")
    if (!apiKey) {
      console.error("GEMINI_API_KEY is not configured")
      return c.json({ error: "AI service is not configured" }, 500)
    }

    const body = await c.req.json()
    const query = typeof body.query === "string" ? body.query.trim() : ""
    if (!query || query.length > 3000) {
      return c.json(
        { error: "A question between 1 and 3000 characters is required" },
        400,
      )
    }

    const parts: Array<Record<string, unknown>> = [{ text: query }]
    if (body.image) {
      const mimeType =
        typeof body.image.mimeType === "string" ? body.image.mimeType : ""
      const data = typeof body.image.data === "string" ? body.image.data : ""
      const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp"])
      if (!allowedTypes.has(mimeType) || !data || data.length > 7_000_000) {
        return c.json({ error: "The crop image is invalid or too large" }, 400)
      }
      parts.push({ inlineData: { mimeType, data } })
    }

    const geminiResponse = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: systemInstruction }] },
          contents: [{ role: "user", parts }],
          generationConfig: {
            temperature: 0.25,
            responseMimeType: "application/json",
            responseSchema,
          },
        }),
      },
    )

    if (!geminiResponse.ok) {
      console.error("Gemini request failed", geminiResponse.status)
      return c.json(
        { error: "Agronomy analysis is temporarily unavailable" },
        502,
      )
    }

    const result = await geminiResponse.json()
    const responseText = result?.candidates?.[0]?.content?.parts?.[0]?.text
    if (typeof responseText !== "string") {
      return c.json({ error: "Agronomy analysis returned no result" }, 502)
    }

    const advice = JSON.parse(responseText)
    const requiredStrings = [
      "diagnosis",
      "summary",
      "urgency",
      "organic",
      "chemical",
    ]
    const isValid =
      requiredStrings.every((field) => typeof advice[field] === "string") &&
      Array.isArray(advice.checks) &&
      Array.isArray(advice.prevention)
    if (!isValid) {
      return c.json(
        { error: "Agronomy analysis returned an invalid result" },
        502,
      )
    }

    return c.json({ advice })
  } catch (error) {
    console.error(
      "Agronomy endpoint error",
      error instanceof Error ? error.message : "Unknown error",
    )
    return c.json({ error: "Unable to complete agronomy analysis" }, 500)
  }
})

Deno.serve(app.fetch)
