const mongoose = require("mongoose");

// Connecting to mongoDB
mongoose
  .connect("mongodb://localhost/playground", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

// Schema
const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

// Model
const Course = mongoose.model("Course", courseSchema);

// For creating a course
async function createCourse() {
  // Object based on Course class
  const course = new Course({
    name: "Angular course",
    author: "Mosh",
    tags: ["angular", "frontend"],
    isPublished: true,
  });

  const result = await course.save();
  console.log(result);
}
// createCourse();

async function getCourse() {
  /**
   * Comparisson Query Operators
   *
   * eq (equal)
   * ne (not equal)
   * gt (greater than)
   * gte (greater than or equal to)
   * lt (less than)
   * lte (less than or equal to)
   * in
   * nin (not in)
   *
   * courses with price gte 10 and lte 20
   * .find({ price: { $gte: 10, $lte: 20 } })
   *
   * courses with price 10, 20 and 30
   * .find({ price: { $in: [10, 20, 30] } })
   */

  /**
   * Logical Query Operators
   *
   * or
   * and
   *
   * courses with author mosh or isPublished true
   * .find()
   * .or([{ author: "Mosh", isPublished: true }])
   *
   * courses with author mosh and isPublished true
   * .find()
   * .and([{ author: "Mosh", isPublished: true }])
   */

  const courses = await Course.find({ author: "Mosh", isPublished: true })
    .limit(10)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 });

  console.log(courses);
}
getCourse();
