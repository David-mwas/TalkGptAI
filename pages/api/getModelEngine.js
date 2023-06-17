import openai from "@/lib/chatGpt";

export default async function handler(req, res) {
  try {
    const response = await openai.listModels();
    const models = response.data.data; // Access the nested 'data' property

    if (!Array.isArray(models)) {
      throw new Error('Invalid response format: models is not an array');
    }

    const modelOptions = models.map((model) => ({
      value: model.id,
      label: model.id,
    }));


    res.status(200).json({ modelOptions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

