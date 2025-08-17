// src/pages/BlogPostPage.jsx
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import TextReveal from '../components/TextReveal';

const BLOG_CONTENT = {
  'my-ai-journey': {
    title: 'My Journey into AI and Machine Learning',
    date: '2024-01-15',
    category: 'Personal',
    readTime: '5 min read',
    content: `
# My Journey into AI and Machine Learning

As a final year AI and Data Science student, I often get asked how I got started in this fascinating field. Here's my story and some lessons I've learned along the way.

## The Beginning

It all started in my second year when I took my first programming course. I was amazed by how we could make computers solve complex problems with just a few lines of code. But it wasn't until I discovered machine learning that I truly found my passion.

## First Steps

My first encounter with AI was through a simple linear regression model. I remember the excitement I felt when I saw the computer predict house prices based on historical data. It was like magic!

### Key Learning Points:
- Start with the basics - understand statistics and probability
- Practice coding regularly - Python became my best friend
- Don't be afraid to make mistakes - they're part of learning

## Current Focus

Now I'm working on more advanced projects involving:
- Natural Language Processing
- Computer Vision
- Deep Learning with TensorFlow

## Advice for Beginners

If you're just starting your AI journey, here's what I wish someone had told me:

1. **Master the fundamentals** - Linear algebra, statistics, and programming
2. **Build projects** - Theory is important, but practice makes perfect
3. **Join communities** - Connect with other learners and professionals
4. **Stay curious** - AI is constantly evolving

The journey isn't always easy, but it's incredibly rewarding. Every day brings new challenges and opportunities to learn something amazing.

---

*What's your AI story? I'd love to hear about your journey in the comments below!*
    `
  },
  'python-for-beginners': {
    title: 'Python Fundamentals for Data Science',
    date: '2024-01-20',
    category: 'Tutorial',
    readTime: '8 min read',
    content: `
# Python Fundamentals for Data Science

Python has become the go-to language for data science, and for good reason. Let me share the essential concepts every data science student should master.

## Why Python for Data Science?

Python's simplicity and powerful libraries make it perfect for data analysis:
- **Pandas** for data manipulation
- **NumPy** for numerical computing
- **Matplotlib/Seaborn** for visualization
- **Scikit-learn** for machine learning

## Essential Python Concepts

### 1. Data Types and Structures
\`\`\`python
# Lists for ordered data
data = [1, 2, 3, 4, 5]

# Dictionaries for key-value pairs
student = {'name': 'John', 'age': 20, 'grade': 'A'}

# Sets for unique values
unique_values = {1, 2, 3, 4, 5}
\`\`\`

### 2. List Comprehensions
\`\`\`python
# Instead of loops, use comprehensions
squares = [x**2 for x in range(10)]
even_squares = [x**2 for x in range(10) if x % 2 == 0]
\`\`\`

### 3. Working with Libraries
\`\`\`python
import pandas as pd
import numpy as np

# Create a DataFrame
df = pd.DataFrame({
    'name': ['Alice', 'Bob', 'Charlie'],
    'age': [25, 30, 35],
    'salary': [50000, 60000, 70000]
})
\`\`\`

## Next Steps

Once you're comfortable with these basics:
1. Learn pandas for data manipulation
2. Master matplotlib for visualization
3. Explore scikit-learn for machine learning
4. Practice with real datasets

Remember: the best way to learn is by doing. Start with small projects and gradually work your way up to more complex analyses.

---

*Ready to dive deeper? Check out my next post on building your first ML model!*
    `
  },
  'first-ml-project': {
    title: 'Building My First Machine Learning Model',
    date: '2024-02-01',
    category: 'Project',
    readTime: '12 min read',
    content: `
# Building My First Machine Learning Model

Today I want to share my experience building my first real machine learning project - a sentiment analysis model that can determine if a text is positive or negative.

## Project Overview

**Goal**: Create a model that can classify movie reviews as positive or negative
**Dataset**: IMDB movie reviews
**Tools**: Python, scikit-learn, pandas

## Step 1: Data Collection and Exploration

First, I loaded the dataset and explored its structure:

\`\`\`python
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression

# Load the data
df = pd.read_csv('movie_reviews.csv')
print(df.head())
print(f"Dataset shape: {df.shape}")
\`\`\`

## Step 2: Data Preprocessing

Text data needs special preprocessing:

\`\`\`python
import re
import string

def clean_text(text):
    # Remove special characters and digits
    text = re.sub(r'[^a-zA-Z\\s]', '', text)
    # Convert to lowercase
    text = text.lower()
    return text

df['cleaned_review'] = df['review'].apply(clean_text)
\`\`\`

## Step 3: Feature Engineering

I used TF-IDF to convert text into numerical features:

\`\`\`python
# Split the data
X_train, X_test, y_train, y_test = train_test_split(
    df['cleaned_review'], df['sentiment'], 
    test_size=0.2, random_state=42
)

# Vectorize the text
vectorizer = TfidfVectorizer(max_features=5000, stop_words='english')
X_train_tfidf = vectorizer.fit_transform(X_train)
X_test_tfidf = vectorizer.transform(X_test)
\`\`\`

## Step 4: Model Training

I started with a simple logistic regression:

\`\`\`python
# Train the model
model = LogisticRegression()
model.fit(X_train_tfidf, y_train)

# Make predictions
y_pred = model.predict(X_test_tfidf)
\`\`\`

## Step 5: Evaluation

\`\`\`python
from sklearn.metrics import accuracy_score, classification_report

accuracy = accuracy_score(y_test, y_pred)
print(f"Accuracy: {accuracy:.2f}")
print(classification_report(y_test, y_pred))
\`\`\`

## Results

My first model achieved **85% accuracy**! Not bad for a beginner project.

## Lessons Learned

1. **Data quality matters** - Cleaning text data significantly improved results
2. **Start simple** - Logistic regression worked well as a baseline
3. **Evaluation is crucial** - Accuracy alone doesn't tell the whole story
4. **Iteration is key** - My first attempt was much worse!

## What's Next?

I'm planning to improve this model by:
- Trying different algorithms (Random Forest, SVM)
- Using word embeddings (Word2Vec, GloVe)
- Implementing deep learning approaches

Building your first ML model is exciting and challenging. Don't worry if it doesn't work perfectly the first time - that's part of the learning process!

---

*Want to see the full code? Check out my GitHub repository for this project.*
    `
  }
};

export default function BlogPostPage() {
  const { id } = useParams();
  const post = BLOG_CONTENT[id];

  if (!post) {
    return (
      <div className="min-h-screen pt-20 pb-12 flex items-center justify-center" style={{ background: 'linear-gradient(to bottom, #000011, #000033)' }}>
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Post Not Found</h1>
          <Link to="/blog" className="text-amber-300 hover:text-amber-200">← Back to Blog</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-12" style={{ background: 'linear-gradient(to bottom, #000011, #000033)' }}>
      <div className="max-w-4xl mx-auto px-6">
        <Link to="/blog" className="inline-flex items-center gap-2 text-amber-300 hover:text-amber-200 transition-colors duration-300 mb-8">
          ← Back to Blog
        </Link>

        <TextReveal>
          <article className="bg-white/5 backdrop-blur-sm border border-amber-400/20 rounded-2xl p-8">
            <header className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <span className="px-3 py-1 text-sm bg-amber-500/20 text-amber-300 rounded-full">
                  {post.category}
                </span>
                <span className="text-sm text-gray-400">{post.readTime}</span>
                <span className="text-sm text-gray-400">{post.date}</span>
              </div>
              
              <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-amber-100 mb-4">
                {post.title}
              </h1>
            </header>

            <div className="prose prose-invert prose-amber max-w-none">
              <div 
                className="text-gray-200 leading-relaxed"
                style={{ whiteSpace: 'pre-line' }}
                dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br/>') }}
              />
            </div>
          </article>
        </TextReveal>

        {/* Related Posts */}
        <TextReveal delay={200}>
          <div className="mt-12 bg-white/5 backdrop-blur-sm border border-amber-400/20 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-6">More Articles</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {Object.entries(BLOG_CONTENT)
                .filter(([key]) => key !== id)
                .slice(0, 2)
                .map(([key, relatedPost]) => (
                  <Link 
                    key={key}
                    to={`/blog/${key}`}
                    className="block p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <h4 className="text-lg font-semibold text-white mb-2">{relatedPost.title}</h4>
                    <p className="text-sm text-gray-400">{relatedPost.category} • {relatedPost.readTime}</p>
                  </Link>
                ))}
            </div>
          </div>
        </TextReveal>
      </div>
    </div>
  );
}