DROP SCHEMA IF EXISTS "client_utils" CASCADE;
CREATE SCHEMA "client_utils";

CREATE OR REPLACE FUNCTION client_utils.trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE TABLE "client_utils"."payment_channels"
(
  "channel_id" TEXT NOT NULL PRIMARY KEY,
  "group_id" TEXT NOT NULL,
  "turn_number" INTEGER NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON "client_utils"."payment_channels"
FOR EACH ROW EXECUTE PROCEDURE client_utils.trigger_set_timestamp();


CREATE INDEX channel_lookup_idx ON "client_utils"."payment_channels"
  (group_id, turn_number, channel_id);


-- Insert some seed data

INSERT INTO "client_utils"."payment_channels"
  ("channel_id", "group_id", "turn_number")
VALUES 
  ('0x60182385714FC5092baF37A86AB1da2e9aB204d3', 'group-1', 949),
  ('0x4A41618685588D4D87d598938ECEf19Cb40812B6', 'group-1', 73),
  ('0xDB549364c6eF69C837574d2982BBd7e6E56d465E', 'group-1', 592),
  ('0x6c66EBd9DF1Fd847016F97B3E18ED3624dab2c65', 'group-1', 427),
  ('0x96915bddDa8815843a19234C088C76d7A5F39f21', 'group-2', 195),
  ('0x70867404bC4A9a9faAd082FcBA48F6deDFc4d665', 'group-2', 576),
  ('0x66dF9e0506CA0998063b8094c9B90cbDc1359DdE', 'group-2', 599),
  ('0x062b9a68B5B1cB464210d4627BF02607123F7386', 'group-2', 633),
  ('0x167007819e008F174493D10883a4bf90D5B8B275', 'group-2', 1000),
  ('0x6e236C7D7bc6F77D5E6D345318e7D0e0080de95f', 'group-2', 78),
  ('0xfed243cD59fAC8aF8932d7790C182426618a3b66', 'group-2', 219),
  ('0x14178376608D31d9002C123Aa3Baa6F84b85D7B5', 'group-3', 454),
  ('0x32F8CB1d2fd0b69A01f984EeffE563054c1b7bc8', 'group-3', 834),
  ('0x2d2513ce9968C2FbE525997E1D8bf1ecE22fE625', 'group-3', 5),
  ('0x70cD5A7C3De3dD9C56374B9b2018eC6ED4738bC8', 'group-3', 273),
  ('0x9EC221C83279E9a39FF096435Bd7D25637bf1200', 'group-3', 994),
  ('0xadC8fC9894A1f8c3092Fbb23c818AD2D302BEbA7', 'group-3', 307);