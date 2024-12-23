"use client"; // Add this directive at the top

import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Head from 'next/head';

interface Course {
  course_name: string;
  university: string;
  rating: number;
  level: string;
  link: string;
}

export default function Home() {
  const [query, setQuery] = useState<string>('');
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/recommend', {
        params: { query, topN: 5 },
      });
      setCourses(response.data.courses);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-700 via-gray-900 to-black text-white font-poppins flex flex-col">
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet" />
      </Head>
      <header className="bg-transparent p-6 text-center">
        <nav className="flex justify-between items-center">
          <h1 className="text-4xl font-bold">SkillShelf</h1>
          <ul className="flex space-x-4">
            <li><Link href="/landing"><a>Home</a></Link></li>
            <li><a href="#about">About Us</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </header>
      <main className="p-8 flex-grow">
        <section className="text-center mb-8">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter a course name or topic"
            className="p-2 border rounded mb-4 w-full max-w-md bg-transparent text-white border-white"
          />
          <button
            onClick={handleSearch}
            disabled={loading}
            className="p-2 bg-blue-500 text-white rounded"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </section>
        <section>
          <h2 className="text-2xl font-bold mb-4">Recommended Courses</h2>
          <ul className="list-none p-0">
            {courses.map((course, index) => (
              <li key={index} className="mb-4 p-4 border rounded bg-transparent text-white shadow">
                <h3 className="text-lg font-semibold">{course.course_name}</h3>
                <p>University: {course.university}</p>
                <p>Rating: {course.rating}</p>
                <p>Level: {course.level}</p>
                <a href={course.link} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                  Course Link
                </a>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <footer className="bg-transparent p-6 text-center mt-auto">
        <p>&copy; 2023 SkillShelf. All rights reserved.</p>
      </footer>
    </div>
  );
}