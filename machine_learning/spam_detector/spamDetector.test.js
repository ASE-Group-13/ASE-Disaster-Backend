//const detector = require(`${route}/machine_learning/spam_detector/spamDetector.js`)
const {predictMessage} = require("C:/myProjects/ASE/ASE-Disaster-Backend/machine_learning/spam_detector/spamDetector.js");

describe("Predicting Spam Tests", () => {
  test('returns something',()=>{
    expect(predictMessage("This is a test")).not.toBeNull;
  })

  // test('returns error if argument is not string',()=>{
  //   expect(detector.predictMessage(10)).toBe("error");
  // })

  test('returns 1 if message is real',()=>{
    expect(predictMessage("Chemical Fire on South Leinster Street! Send Help!")).toBe(true);
  })

  test('returns 0 if message is spam',()=>{
    expect(predictMessage("This party is ablaze!")).toBe(false);
  })
})