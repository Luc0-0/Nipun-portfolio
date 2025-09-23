// src/pages/BlogPostPage.jsx
import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import TextReveal from '../components/TextReveal';
import { useAnalytics } from '../hooks/useAnalytics';

const BLOG_CONTENT = {
  'my-ai-journey': {
    title: 'From Zero to AI: My BTech Journey in Data Science',
    date: '2024-12-15',
    category: 'Personal',
    readTime: '6 min read',
    content: `
      <p>When I started my BTech in AI and Data Science, I had no idea what I was getting into. Like many students, I was drawn to the buzzwords - "artificial intelligence," "machine learning," "data science" - but the reality of learning these technologies was far more challenging and rewarding than I expected.</p>
      
      <h2>The Reality Check</h2>
      <p>My first semester was a wake-up call. Mathematics wasn't just important - it was everything. Linear algebra, statistics, calculus - subjects I thought I'd left behind in high school suddenly became the foundation of everything I wanted to learn. Maintaining my current 8.0 CGPA required not just memorizing formulas, but truly understanding the mathematical concepts behind AI algorithms.</p>
      
      <h2>Finding My Path</h2>
      <p>By my second year, I discovered Python. What started as a required programming course became my gateway into the world of data science. I spent countless hours learning pandas for data manipulation, numpy for numerical computing, and matplotlib for visualization. Each library opened new possibilities.</p>
      
      <h2>The Coursera Journey</h2>
      <p>Classroom learning wasn't enough. I enrolled in the IBM AI Developer Professional Certificate on Coursera. This decision changed everything. The hands-on projects, real-world applications, and industry-standard tools gave me confidence that I was learning skills that actually mattered in the job market.</p>
      
      <h2>Choosing Mental Health AI</h2>
      <p>For my final year project, I chose to work on Mental Health AI Embedded Assistance. This wasn't just a technical challenge - it was personal. I wanted to build something that could genuinely help people. The project combines NLP, sentiment analysis, and conversational AI to create a system that can provide mental health support and monitoring.</p>
      
      <h2>Looking Forward</h2>
      <p>As I approach graduation in 2026, I'm excited about the possibilities ahead. The field of AI is evolving rapidly, and I feel prepared to contribute meaningfully to this evolution. My advice to fellow students: embrace the mathematics, get your hands dirty with real projects, and never stop learning.</p>
    `
  },
  'python-for-ai': {
    title: 'Python Libraries Every AI Student Should Master',
    date: '2024-12-10',
    category: 'Tutorial',
    readTime: '8 min read',
    content: `
      <p>After three years of studying AI and Data Science, I've learned that success in this field isn't just about understanding algorithms - it's about mastering the tools that bring those algorithms to life. Here are the Python libraries that have been game-changers in my learning journey.</p>
      
      <h2>1. NumPy: The Foundation</h2>
      <p>NumPy was my first real introduction to scientific computing in Python. At first, I didn't understand why we needed it when Python had lists. Then I learned about vectorization and performance. NumPy arrays are not just faster - they're the foundation that every other library builds upon.</p>
      <p><strong>Key concepts I mastered:</strong></p>
      <ul>
        <li>Array creation and manipulation</li>
        <li>Broadcasting and vectorization</li>
        <li>Linear algebra operations</li>
        <li>Random number generation for simulations</li>
      </ul>
      
      <h2>2. Pandas: Data Manipulation Made Easy</h2>
      <p>If NumPy is the foundation, pandas is the workhorse. Every data science project I've worked on has involved pandas. From my cat vs dog classification project to my Azure business card analyzer, pandas has been essential for data cleaning and preprocessing.</p>
      <p><strong>Essential pandas skills:</strong></p>
      <ul>
        <li>DataFrame operations and indexing</li>
        <li>Data cleaning and handling missing values</li>
        <li>Groupby operations and aggregations</li>
        <li>Merging and joining datasets</li>
      </ul>
      
      <h2>3. Scikit-learn: Machine Learning in Practice</h2>
      <p>Scikit-learn taught me that machine learning isn't magic - it's systematic application of statistical methods. The consistent API across all algorithms made it easy to experiment with different approaches on the same dataset.</p>
      <p><strong>Projects where I used scikit-learn:</strong></p>
      <ul>
        <li>Image classification with Support Vector Machines</li>
        <li>Sentiment analysis with Naive Bayes</li>
        <li>Customer segmentation with K-means clustering</li>
      </ul>
      
      <h2>4. TensorFlow: Deep Learning Reality</h2>
      <p>TensorFlow was intimidating at first. The learning curve is steep, but the power it provides is incredible. My speech synthesis project wouldn't have been possible without TensorFlow's deep learning capabilities.</p>
      
      <h2>5. Matplotlib & Seaborn: Telling Stories with Data</h2>
      <p>Data visualization isn't just about making pretty charts - it's about understanding your data and communicating insights. Matplotlib gave me the foundation, while Seaborn made statistical visualizations beautiful and informative.</p>
      
      <h2>My Learning Approach</h2>
      <p>Don't try to learn everything at once. Start with NumPy and pandas, build some projects, then gradually add more libraries as you need them. Each library should solve a real problem you're facing, not just be something you think you should know.</p>
      
      <p>The key is consistent practice. I try to use these libraries in small projects every week, even if it's just analyzing a dataset I find interesting or implementing a simple algorithm from scratch.</p>
    `
  },
  'mental-health-ai': {
    title: 'Building Mental Health AI: My Final Year Project',
    date: '2024-12-05',
    category: 'Project',
    readTime: '10 min read',
    content: `
      <p>Mental health is a crisis that affects millions of people worldwide, yet access to mental health support remains limited. For my final year project, I decided to tackle this challenge by building an AI-powered mental health assistance system. Here's the journey of creating "Mental Health AI Embedded Assistance."</p>
      
      <h2>The Problem</h2>
      <p>Traditional mental health support faces several challenges:</p>
      <ul>
        <li>Limited availability of mental health professionals</li>
        <li>High costs of therapy and counseling</li>
        <li>Stigma associated with seeking help</li>
        <li>Lack of 24/7 support when people need it most</li>
      </ul>
      
      <h2>My Solution Approach</h2>
      <p>I envisioned an AI system that could provide:</p>
      <ul>
        <li><strong>Conversational Support:</strong> Natural language processing to understand user emotions and provide appropriate responses</li>
        <li><strong>Sentiment Monitoring:</strong> Continuous analysis of user input to detect changes in mental state</li>
        <li><strong>Personalized Recommendations:</strong> Tailored coping strategies and resources based on individual needs</li>
        <li><strong>Crisis Detection:</strong> Ability to identify when professional intervention might be needed</li>
      </ul>
      
      <h2>Technical Architecture</h2>
      <p>The system is built using several key technologies:</p>
      
      <h3>Natural Language Processing</h3>
      <p>I used transformer-based models for understanding user input. The challenge was training the model to recognize subtle emotional cues in text while maintaining empathy and avoiding harmful responses.</p>
      
      <h3>Sentiment Analysis Engine</h3>
      <p>Built with Python and scikit-learn, this component analyzes the emotional tone of conversations over time. It tracks patterns and can identify concerning trends in a user's mental state.</p>
      
      <h3>Conversational AI</h3>
      <p>The chatbot interface uses a combination of rule-based responses for safety-critical situations and machine learning for more natural conversations. I spent considerable time ensuring the responses were helpful rather than harmful.</p>
      
      <h2>Challenges Faced</h2>
      
      <h3>Ethical Considerations</h3>
      <p>This was the biggest challenge. How do you build an AI system that helps without overstepping boundaries? I had to carefully design safeguards to:</p>
      <ul>
        <li>Never replace professional medical advice</li>
        <li>Recognize when to recommend human intervention</li>
        <li>Protect user privacy and sensitive data</li>
        <li>Avoid reinforcing harmful behaviors</li>
      </ul>
      
      <h3>Data Sensitivity</h3>
      <p>Mental health data is extremely sensitive. I implemented strong encryption, anonymization techniques, and followed strict data protection protocols throughout the development process.</p>
      
      <h3>Model Training</h3>
      <p>Finding appropriate training data was challenging. I used publicly available mental health datasets while being careful about bias and representation in the training data.</p>
      
      <h2>Current Progress</h2>
      <p>As of now, I have completed:</p>
      <ul>
        <li>✅ Literature review and problem analysis</li>
        <li>✅ System architecture design</li>
        <li>✅ Basic NLP pipeline implementation</li>
        <li>✅ Sentiment analysis module</li>
        <li>🔄 Conversational AI training (in progress)</li>
        <li>⏳ User interface development (planned)</li>
        <li>⏳ Testing and validation (planned)</li>
      </ul>
      
      <h2>Expected Impact</h2>
      <p>While this project won't solve the mental health crisis, I hope it can:</p>
      <ul>
        <li>Provide immediate support when professional help isn't available</li>
        <li>Help users track their mental health patterns</li>
        <li>Reduce barriers to seeking initial support</li>
        <li>Complement existing mental health resources</li>
      </ul>
      
      <h2>Lessons Learned</h2>
      <p>This project has taught me that building AI for healthcare requires more than technical skills. It demands empathy, ethical thinking, and a deep understanding of the human problems you're trying to solve. The responsibility of building systems that could impact people's wellbeing is both humbling and motivating.</p>
      
      <p>I'm excited to complete this project and hopefully contribute something meaningful to the field of mental health technology. The intersection of AI and healthcare is where I see my future career, and this project is just the beginning.</p>
    `
  },
  'azure-ai-experience': {
    title: 'Learning Cloud AI with Microsoft Azure',
    date: '2024-11-28',
    category: 'Tutorial',
    readTime: '7 min read',
    content: `
      <p>Cloud computing and AI go hand in hand in today's tech landscape. As a student, I wanted to understand how AI services work in the cloud, so I dove deep into Microsoft Azure's AI offerings. Here's what I learned and built along the way.</p>
      
      <h2>Why Azure for AI?</h2>
      <p>I chose Azure for several reasons:</p>
      <ul>
        <li>Comprehensive AI services that don't require deep ML expertise</li>
        <li>Good documentation and learning resources</li>
        <li>Student credits that made experimentation affordable</li>
        <li>Integration with development tools I was already using</li>
      </ul>
      
      <h2>Project 1: Computer Vision API</h2>
      <p>My first Azure AI project involved building an image analysis application using the Computer Vision API. The goal was to automatically tag and describe images uploaded by users.</p>
      
      <h3>What I Built:</h3>
      <ul>
        <li>Python Flask web application</li>
        <li>Image upload functionality</li>
        <li>Integration with Azure Computer Vision API</li>
        <li>Results display showing detected objects, text, and descriptions</li>
      </ul>
      
      <h3>Key Learnings:</h3>
      <p>The Computer Vision API was surprisingly powerful out of the box. With just a few lines of code, I could extract detailed information from images. However, I learned that the quality of results depends heavily on image quality and the specific use case.</p>
      
      <h2>Project 2: Business Card Analyzer</h2>
      <p>Building on my computer vision experience, I created a business card analyzer using Azure Form Recognizer. This project automatically extracts contact information from business card images.</p>
      
      <h3>Technical Implementation:</h3>
      <p>I used Azure Form Recognizer's prebuilt business card model, which can identify:</p>
      <ul>
        <li>Names and job titles</li>
        <li>Company names</li>
        <li>Phone numbers and email addresses</li>
        <li>Physical addresses</li>
        <li>Websites and social media handles</li>
      </ul>
      
      <h3>Challenges and Solutions:</h3>
      <p>The biggest challenge was handling different business card layouts and languages. I learned to implement confidence scoring and fallback mechanisms for low-confidence extractions.</p>
      
      <h2>Working with Azure Cognitive Services</h2>
      
      <h3>Authentication and Security</h3>
      <p>I learned the importance of proper API key management and implemented environment variables for secure credential storage. Azure's role-based access control helped me understand enterprise-level security practices.</p>
      
      <h3>Cost Management</h3>
      <p>As a student, I had to be mindful of costs. I learned to:</p>
      <ul>
        <li>Monitor usage through Azure portal</li>
        <li>Implement caching to reduce API calls</li>
        <li>Use the free tier effectively</li>
        <li>Set up billing alerts</li>
      </ul>
      
      <h2>Performance and Optimization</h2>
      <p>Working with cloud APIs taught me about:</p>
      <ul>
        <li><strong>Latency:</strong> Network calls add delay, so batching requests when possible is important</li>
        <li><strong>Error Handling:</strong> Cloud services can fail, so robust error handling is essential</li>
        <li><strong>Rate Limiting:</strong> Understanding and respecting API limits prevents service disruptions</li>
      </ul>
      
      <h2>Integration with Development Workflow</h2>
      <p>I learned to integrate Azure services into my development workflow:</p>
      <ul>
        <li>Using Azure CLI for resource management</li>
        <li>Setting up development and production environments</li>
        <li>Implementing proper logging and monitoring</li>
        <li>Version control for configuration files</li>
      </ul>
      
      <h2>Real-World Applications</h2>
      <p>These projects taught me how AI services are actually used in business:</p>
      <ul>
        <li><strong>Document Processing:</strong> Automating data extraction from forms and documents</li>
        <li><strong>Content Moderation:</strong> Automatically detecting inappropriate content</li>
        <li><strong>Accessibility:</strong> Providing text descriptions for images</li>
        <li><strong>Business Process Automation:</strong> Reducing manual data entry tasks</li>
      </ul>
      
      <h2>Next Steps</h2>
      <p>My experience with Azure AI services has opened up new possibilities for my final year project. I'm now exploring how to integrate cloud AI services with my mental health AI system, particularly for processing and analyzing user interactions at scale.</p>
      
      <p>For fellow students interested in cloud AI, I recommend starting with the free tier and building small, focused projects. The hands-on experience is invaluable, and the skills you learn are directly applicable in the job market.</p>
    `
  },
  'coursera-ai-certification': {
    title: 'IBM AI Developer Certification: My Experience',
    date: '2024-11-20',
    category: 'Career',
    readTime: '5 min read',
    content: `
      <p>Online certifications can be hit or miss, but the IBM AI Developer Professional Certificate on Coursera has been one of the most valuable learning experiences of my academic journey. Here's my honest review and what I gained from completing this certification.</p>
      
      <h2>Why I Chose This Certification</h2>
      <p>As a BTech AI and Data Science student, I wanted to supplement my academic learning with industry-relevant skills. IBM's reputation in AI and the comprehensive curriculum covering both theory and practical applications made this certification appealing.</p>
      
      <h2>Course Structure and Content</h2>
      <p>The certification consists of multiple courses covering:</p>
      <ul>
        <li><strong>AI Fundamentals:</strong> History, applications, and ethical considerations</li>
        <li><strong>Python for AI:</strong> Essential programming skills and libraries</li>
        <li><strong>Machine Learning:</strong> Supervised and unsupervised learning algorithms</li>
        <li><strong>Deep Learning:</strong> Neural networks and frameworks like TensorFlow</li>
        <li><strong>AI Applications:</strong> Computer vision, NLP, and chatbots</li>
        <li><strong>AI Ethics:</strong> Bias, fairness, and responsible AI development</li>
      </ul>
      
      <h2>Hands-On Projects</h2>
      <p>What set this certification apart were the practical projects:</p>
      
      <h3>Project 1: Image Classification</h3>
      <p>Built a convolutional neural network to classify images. This project taught me about data preprocessing, model architecture design, and performance evaluation.</p>
      
      <h3>Project 2: Chatbot Development</h3>
      <p>Created a customer service chatbot using IBM Watson. This was my first exposure to conversational AI and natural language understanding.</p>
      
      <h3>Project 3: Recommendation System</h3>
      <p>Developed a movie recommendation system using collaborative filtering. This project helped me understand how recommendation algorithms work in real applications like Netflix or Amazon.</p>
      
      <h2>Skills I Gained</h2>
      
      <h3>Technical Skills</h3>
      <ul>
        <li>Proficiency in Python libraries (NumPy, Pandas, Scikit-learn, TensorFlow)</li>
        <li>Understanding of machine learning algorithms and when to use them</li>
        <li>Experience with IBM Watson services</li>
        <li>Knowledge of AI model deployment and monitoring</li>
      </ul>
      
      <h3>Soft Skills</h3>
      <ul>
        <li>Problem-solving approach to AI challenges</li>
        <li>Understanding of AI ethics and responsible development</li>
        <li>Ability to communicate AI concepts to non-technical audiences</li>
        <li>Project management skills for AI initiatives</li>
      </ul>
      
      <h2>How It Complemented My Academic Studies</h2>
      <p>The certification filled gaps in my university curriculum:</p>
      <ul>
        <li><strong>Industry Perspective:</strong> Real-world applications and business use cases</li>
        <li><strong>Practical Tools:</strong> Hands-on experience with industry-standard tools</li>
        <li><strong>Current Trends:</strong> Up-to-date content reflecting latest AI developments</li>
        <li><strong>Professional Skills:</strong> Project presentation and documentation</li>
      </ul>
      
      <h2>Challenges and How I Overcame Them</h2>
      
      <h3>Time Management</h3>
      <p>Balancing certification coursework with my regular studies was challenging. I dedicated 2-3 hours daily and completed the certification over 4 months.</p>
      
      <h3>Technical Complexity</h3>
      <p>Some concepts, especially deep learning mathematics, were initially difficult. I supplemented the course material with additional resources and practice problems.</p>
      
      <h3>Project Requirements</h3>
      <p>The capstone projects required significant effort. I learned to break them down into smaller tasks and seek help from the course forums when stuck.</p>
      
      <h2>Impact on My Career Preparation</h2>
      <p>This certification has been valuable for:</p>
      <ul>
        <li><strong>Resume Building:</strong> Demonstrates practical AI skills to employers</li>
        <li><strong>Interview Preparation:</strong> Real project experience to discuss</li>
        <li><strong>Network Building:</strong> Connected with other learners and industry professionals</li>
        <li><strong>Confidence Building:</strong> Validation of my AI knowledge and skills</li>
      </ul>
      
      <h2>Would I Recommend It?</h2>
      <p>Absolutely, but with some caveats:</p>
      
      <h3>Best For:</h3>
      <ul>
        <li>Students wanting practical, industry-relevant AI skills</li>
        <li>Those who learn well through hands-on projects</li>
        <li>People seeking to complement academic studies with real-world applications</li>
      </ul>
      
      <h3>Not Ideal For:</h3>
      <ul>
        <li>Complete beginners without basic programming knowledge</li>
        <li>Those looking for deep theoretical understanding (better suited for academic courses)</li>
        <li>People who prefer self-paced learning without deadlines</li>
      </ul>
      
      <h2>Final Thoughts</h2>
      <p>The IBM AI Developer Professional Certificate has been instrumental in bridging the gap between academic theory and industry practice. It's given me confidence in my AI skills and provided concrete projects to showcase my abilities. For fellow students considering this certification, I'd say it's worth the investment if you're committed to putting in the effort.</p>
      
      <p>The field of AI is rapidly evolving, and continuous learning is essential. This certification was just one step in my journey, but it's been a significant one that has shaped my understanding of AI and my career aspirations.</p>
    `
  }
};

export default function BlogPostPage() {
  const { id } = useParams();
  const post = BLOG_CONTENT[id];
  const { trackBlogView } = useAnalytics();

  useEffect(() => {
    if (post) {
      trackBlogView(post.title);
    }
  }, [post, trackBlogView]);

  if (!post) {
    return (
      <div className="min-h-screen pt-20 pb-12 flex items-center justify-center cursor-default" style={{ background: 'linear-gradient(to bottom, #000011, #000033)' }}>
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Post Not Found</h1>
          <Link to="/blog" className="text-amber-300 hover:text-amber-200">← Back to Blog</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-12 cursor-default" style={{ background: 'linear-gradient(to bottom, #000011, #000033)' }}>
      <style jsx>{`
        .blog-content {
          line-height: 1.8;
          font-size: 1.1rem;
        }
        .blog-content p {
          margin-bottom: 1.75rem;
          color: #e5e7eb;
          text-align: justify;
        }
        .blog-content h2 {
          font-size: 2rem;
          font-weight: 700;
          margin: 3rem 0 1.5rem 0;
          color: #fbbf24;
          border-left: 4px solid #f59e0b;
          padding-left: 1.5rem;
          background: linear-gradient(90deg, rgba(251, 191, 36, 0.1) 0%, transparent 100%);
          padding: 1rem 0 1rem 1.5rem;
          border-radius: 0 8px 8px 0;
        }
        .blog-content h3 {
          font-size: 1.5rem;
          font-weight: 600;
          margin: 2.5rem 0 1.25rem 0;
          color: #fcd34d;
          position: relative;
        }
        .blog-content h3::before {
          content: '▶';
          color: #f59e0b;
          margin-right: 0.5rem;
          font-size: 0.8rem;
        }
        .blog-content ul {
          margin: 1.5rem 0;
          padding-left: 0;
        }
        .blog-content li {
          margin-bottom: 1rem;
          color: #d1d5db;
          position: relative;
          padding-left: 2rem;
          list-style: none;
        }
        .blog-content li::before {
          content: '✦';
          color: #f59e0b;
          position: absolute;
          left: 0;
          top: 0;
        }
        .blog-content strong {
          color: #fbbf24;
          font-weight: 600;
          background: rgba(251, 191, 36, 0.1);
          padding: 0.125rem 0.25rem;
          border-radius: 0.25rem;
        }
        .blog-content blockquote {
          border-left: 4px solid #f59e0b;
          padding: 1.5rem;
          margin: 2rem 0;
          background: rgba(251, 191, 36, 0.05);
          border-radius: 0.5rem;
          font-style: italic;
          color: #fcd34d;
        }
        .blog-content code {
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid #f59e0b;
          padding: 0.25rem 0.5rem;
          border-radius: 0.375rem;
          font-family: 'Fira Code', 'Consolas', monospace;
          color: #fbbf24;
          font-size: 0.9rem;
        }
      `}</style>
      <div className="max-w-5xl mx-auto px-6">
        <Link to="/blog" className="inline-flex items-center gap-3 text-amber-300 hover:text-amber-200 transition-all duration-300 mb-10 group">
          <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Blog
        </Link>

        <TextReveal>
          <article className="bg-white/5 backdrop-blur-sm border border-amber-400/20 rounded-3xl overflow-hidden shadow-2xl">
            <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 p-8 md:p-12 border-b border-amber-400/20">
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <span className="px-4 py-2 text-sm bg-amber-500/20 text-amber-300 rounded-full border border-amber-400/30 font-medium">
                  {post.category}
                </span>
                <div className="flex items-center gap-2 text-gray-300">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm">{post.readTime}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm">{post.date}</span>
                </div>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-100 to-amber-200 leading-tight">
                {post.title}
              </h1>
            </div>

            <div className="p-8 md:p-12">
              <div 
                className="blog-content max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>
          </article>
        </TextReveal>

        {/* Related Posts */}
        <TextReveal delay={200}>
          <div className="mt-16 bg-white/5 backdrop-blur-sm border border-amber-400/20 rounded-3xl p-8 md:p-10">
            <div className="flex items-center gap-3 mb-8">
              <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              <h3 className="text-2xl font-bold text-white">Continue Reading</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {Object.entries(BLOG_CONTENT)
                .filter(([key]) => key !== id)
                .slice(0, 2)
                .map(([key, relatedPost]) => (
                  <Link 
                    key={key}
                    to={`/blog/${key}`}
                    className="group block p-6 bg-white/5 rounded-2xl hover:bg-white/10 transition-all duration-300 border border-transparent hover:border-amber-400/30"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <span className="px-3 py-1 text-xs bg-amber-500/20 text-amber-300 rounded-full">
                        {relatedPost.category}
                      </span>
                      <svg className="w-5 h-5 text-amber-400 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                      </svg>
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-3 group-hover:text-amber-100 transition-colors">
                      {relatedPost.title}
                    </h4>
                    <p className="text-sm text-gray-400">{relatedPost.readTime}</p>
                  </Link>
                ))}
            </div>
          </div>
        </TextReveal>
      </div>
    </div>
  );
}