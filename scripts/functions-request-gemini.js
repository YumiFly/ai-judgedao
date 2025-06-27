// functions-request-gemini.js
// Chainlink Functions request script template (Gemini + IPFS)

const { buildRequestCBOR, Location, CodeLanguage } = require("@chainlink/functions-toolkit");
const axios = require("axios");
const { Web3Storage, File } = require("web3.storage");
require("dotenv").config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const WEB3STORAGE_TOKEN = process.env.WEB3STORAGE_TOKEN;

async function generateAIVerdictPrompt(dispute) {
  return `You are an impartial AI judge.

Case Summary: ${dispute.caseSummary}
Evidence Summary: ${dispute.evidenceSummary}
Applicable Law: ${dispute.legalContext}

Please determine whether the CLAIMANT or the RESPONDENT should win. Explain your reasoning clearly.`;
}

async function callGeminiAPI(prompt) {
  const endpoint = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";
  const response = await axios.post(
    `${endpoint}?key=${GEMINI_API_KEY}`,
    {
      contents: [{ parts: [{ text: prompt }] }],
    },
    {
      headers: { "Content-Type": "application/json" },
    }
  );

  return response.data.candidates[0].content.parts[0].text;
}

async function uploadToIPFS(text, filename = "verdict.txt") {
  const client = new Web3Storage({ token: WEB3STORAGE_TOKEN });
  const file = new File([text], filename, { type: "text/plain" });
  const cid = await client.put([file]);
  return `ipfs://${cid}/${filename}`;
}

async function main() {
  // Example dispute data (replace with live pull via Supabase or API)
  const dispute = {
    caseSummary: "The claimant alleges breach of rental contract by the respondent.",
    evidenceSummary: "Signed rental agreement, payment receipts, and email records.",
    legalContext: "California Civil Code Section 1940-1954.05",
  };

  const prompt = await generateAIVerdictPrompt(dispute);
  console.log("🔹 Prompt sent to Gemini:\n", prompt);

  const verdict = await callGeminiAPI(prompt);
  console.log("✅ Gemini verdict generated:\n", verdict);

  const ipfsURI = await uploadToIPFS(verdict);
  console.log("📦 Verdict uploaded to IPFS:", ipfsURI);

  // You can now return this URI to Chainlink Functions → DisputeRegistry.attachAIVerdict()
  return ipfsURI;
}

main().catch(console.error);
