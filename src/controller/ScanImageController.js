import tf from "@tensorflow/tfjs-node";

let model;

async function loadModel() {
  try {
    model = await tf.loadLayersModel(
      "http://localhost/ml-model/model/model.json"
    );
    console.log("Model loaded");
  } catch (error) {
    console.log(error);
  }
}
loadModel();

export const scanImage = async (req, res) => {
  if (!req.file || !req.file.mimetype.startsWith("image/")) {
    return res.status(400).json({
      error: true,
      message: "Invalid image file.",
    });
  }

  try {
    const image = await tf.node.decodeImage(req.file.buffer);

    const preprocessedImage = preprocessImage(image);

    // Perform the classification
    const predictions = await classifyImage(preprocessedImage);

    console.log(predictions);

    const max = Math.max(...predictions);

    const index = predictions.indexOf(max);

    return res.status(200).json({
      error: false,
      penyakit: `Penyakit nomor ${index + 1}`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: true,
      message: "internal server error",
    });
  }
};

function preprocessImage(image) {
  // Resize the image to match the input shape of the model
  const resizedImage = tf.image.resizeBilinear(image, [150, 150]);

  // Normalize the pixel values
  const normalizedImage = resizedImage.toFloat().div(tf.scalar(255));

  // Add an additional dimension to represent the batch size
  const preprocessedImage = normalizedImage.expandDims();

  return preprocessedImage;
}

async function classifyImage(image) {
  const predictions = await model.predict(image).data();

  return Array.from(predictions);
}
