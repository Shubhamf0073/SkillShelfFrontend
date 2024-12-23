import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [query, setQuery] = useState('');
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/recommend`, {
        params: { query, topN: 5 },
      });
      setCourses(response.data.courses);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <header>
        <h1>SkillShelf - Course Recommender System</h1>
        <p>Discover the best courses based on your interests and previous studies.</p>
      </header>
      <main>
        <section>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter a course name or topic"
          />
          <button onClick={handleSearch} disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </button>
        </section>
        <section>
          <h2>Recommended Courses</h2>
          <ul>
            {courses.map((course, index) => (
              <li key={index}>
                <h3>{course.course_name}</h3>
                <p>University: {course.university}</p>
                <p>Rating: {course.rating}</p>
                <p>Level: {course.level}</p>
                <a href={course.link} target="_blank" rel="noopener noreferrer">Course Link</a>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <style jsx>{`
        header {
          text-align: center;
          padding: 2rem;
          background: #f5f5f5;
        }
        main {
          padding: 2rem;
        }
        section {
          margin-top: 2rem;
        }
        ul {
          list-style: none;
          padding: 0;
        }
        li {
          margin-bottom: 1rem;
          padding: 1rem;
          border: 1px solid #ddd;
          border-radius: 4px;
        }
        input {
          padding: 0.5rem;
          margin-right: 0.5rem;
        }
        button {
          padding: 0.5rem 1rem;
        }
      `}</style>
    </div>
  );
}