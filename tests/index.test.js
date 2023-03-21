const axios = require("axios");
// const index = require("../index");

  test("should return a 200 response and a welcome message", async () => {
    const res = await axios.get("http://localhost:8000/api/v1/hello");
    expect(res.status).toEqual(200);
    expect(res.data.message).toEqual(
      "Hello User!\nHow are you? Welcome to Disastro!"
    );
  });

// afterAll(async () => {
//     await new Promise((resolve) => setTimeout(() => resolve(), 5000));
//     index.close();
//   });