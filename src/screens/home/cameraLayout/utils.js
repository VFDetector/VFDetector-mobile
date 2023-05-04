// const capture = async () => {
//     const photo = await camera?.current?.takePictureAsync({ quality: 0.1 });
//     setTmpImage(photo?.uri);
//     const { size } = await FileSystem.getInfoAsync(photo.uri);
//     console.log(`File size: ${size} bytes`);
//     const tensor_image = await models.perform.transformImageToTensor(photo.uri);
//     const predictions = await models.perform.makePredictions(
//       1,
//       model,
//       tensor_image
//     );
//   };

const updateLocalHistory = async (database, predictionValue) => {
  try {
    database.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO detectHistory (prediction, detect_time) VALUES (?, CURRENT_TIMESTAMP)",
        [predictionValue?.prediction],
        (txObj, resultSet) => {
          console.log("Detect history created successfully");
        },
        (txObj, error) => {
          console.log("Error:", error);
        }
      );
    });
  } catch (error) {
    console.log(error);
  }
};

export { updateLocalHistory };
