import { google } from "googleapis";

function requiredEnv(name) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing ${name}`);
  return v;
}

function getPrivateKey() {
  // Common pattern: store with literal \n in env var.
  return requiredEnv("GOOGLE_PRIVATE_KEY").replace(/\\n/g, "\n");
}

function getSheetsClient() {
  const clientEmail = requiredEnv("GOOGLE_SERVICE_ACCOUNT_EMAIL");
  const privateKey = getPrivateKey();

  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  return google.sheets({ version: "v4", auth });
}

export function getGoogleSheetsConfigError() {
  try {
    requiredEnv("GOOGLE_SHEETS_SPREADSHEET_ID");
    requiredEnv("GOOGLE_SHEETS_ENQUIRY_SHEET_NAME");
    requiredEnv("GOOGLE_SHEETS_SERVICE_SHEET_NAME");
    requiredEnv("GOOGLE_SERVICE_ACCOUNT_EMAIL");
    requiredEnv("GOOGLE_PRIVATE_KEY");
    return null;
  } catch (e) {
    return e?.message || "Google Sheets is not configured";
  }
}

export async function appendToSheet({ sheetName, values }) {
  const spreadsheetId = requiredEnv("GOOGLE_SHEETS_SPREADSHEET_ID");
  const sheets = getSheetsClient();

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${sheetName}!A:Z`,
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: [values],
    },
  });
}

