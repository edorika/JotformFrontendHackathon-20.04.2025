const apiKey = import.meta.env.VITE_API_KEY;
const formID = "251074364369966";

const endpoint = `https://api.jotform.com/form/${formID}/payment-info?apiKey=${apiKey}`;

export async function getProducts() {
  const res = await fetch(endpoint);
  if (!res.ok) {
    throw new Error("Failed to fetch payment info");
  }
  return res.json();
}