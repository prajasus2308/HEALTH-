CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TYPE user_role AS ENUM (
  'farmer',
  'agronomist',
  'enterprise_admin'
);

CREATE TYPE diagnosis_severity AS ENUM (
  'Low',
  'Moderate',
  'Critical'
);

CREATE TABLE users (
  user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username VARCHAR(24) NOT NULL UNIQUE
    CHECK (username ~ '^[a-z0-9_]{3,24}$'),
  full_name VARCHAR(160) NOT NULL,
  phone_number VARCHAR(32) UNIQUE,
  location VARCHAR(255),
  role user_role NOT NULL DEFAULT 'farmer',
  password_hash TEXT NOT NULL,
  password_salt TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE farmer_sessions (
  session_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  token_hash TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE farms (
  farm_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  farm_name VARCHAR(160) NOT NULL,
  total_area_acres DECIMAL(12, 2) NOT NULL
    CHECK (total_area_acres >= 0),
  soil_type VARCHAR(80),
  primary_crop VARCHAR(120)
);

CREATE TABLE ai_diagnoses (
  diagnosis_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  farm_id UUID REFERENCES farms(farm_id) ON DELETE SET NULL,
  image_url TEXT,
  farmer_query TEXT NOT NULL,
  ai_response TEXT NOT NULL,
  identified_disease VARCHAR(255),
  confidence_score DECIMAL(5, 2)
    CHECK (confidence_score BETWEEN 0 AND 100),
  severity diagnosis_severity,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CHECK (image_url IS NOT NULL OR length(trim(farmer_query)) > 0)
);

CREATE TABLE agricultural_knowledge_base (
  knowledge_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  crop_name VARCHAR(120) NOT NULL,
  pest_or_disease_name VARCHAR(255) NOT NULL,
  symptoms TEXT NOT NULL,
  organic_remedies TEXT,
  chemical_treatments TEXT,
  preventative_tips TEXT
);

CREATE INDEX farms_user_id_idx
  ON farms(user_id);

CREATE INDEX farmer_sessions_user_id_idx
  ON farmer_sessions(user_id);

CREATE INDEX farmer_sessions_expires_at_idx
  ON farmer_sessions(expires_at);

CREATE INDEX ai_diagnoses_user_created_at_idx
  ON ai_diagnoses(user_id, created_at DESC);

CREATE INDEX ai_diagnoses_farm_id_idx
  ON ai_diagnoses(farm_id)
  WHERE farm_id IS NOT NULL;

CREATE INDEX knowledge_crop_name_idx
  ON agricultural_knowledge_base(crop_name);

CREATE INDEX knowledge_disease_name_idx
  ON agricultural_knowledge_base(pest_or_disease_name);
