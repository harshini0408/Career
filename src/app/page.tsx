import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Image } from '@/components/ui/image';
import { BaseCrudService } from '@/integrations';
import { Features } from '@/entities/features';
import { Testimonials } from '@/entities/testimonials';
import { 
  Brain, 
  MapPin, 
  FileText, 
  BookOpen, 
  Upload, 
  Lightbulb, 
  Target,
  Star,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

export default function HomePage() {
  const [features, setFeatures] = useState<Features[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonials[]>([]);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: ''
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const [featuresData, testimonialsData] = await Promise.all([
          BaseCrudService.getAll<Features>('Features'),
          BaseCrudService.getAll<Testimonials>('Testimonials')
        ]);
        
        setFeatures(featuresData.items.filter(f => f.isActive).sort((a, b) => a.displayOrder - b.displayOrder));
        setTestimonials(testimonialsData.items.slice(0, 4));
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadData();
  }, []);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Contact form submitted:', contactForm);
    setContactForm({ name: '', email: '', message: '' });
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-6 text-center relative z-10" style={{ maxWidth: '120rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto"
          >
            <motion.h1 
              className="font-heading text-6xl md:text-8xl lg:text-9xl font-bold text-secondary-foreground mb-8 leading-tight"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Your AI-Powered
              <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Career & Skills Advisor
              </span>
            </motion.h1>
            
            <motion.p 
              className="font-paragraph text-xl md:text-2xl text-secondary-foreground/80 mb-12 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Unlock your potential with personalized career guidance, skill mapping, and AI-driven insights. 
              Transform your professional journey with data-driven recommendations tailored just for you.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-12 py-6 text-xl font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Get Started Free
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-accent text-accent hover:bg-accent hover:text-primary-foreground px-12 py-6 text-xl font-semibold rounded-xl transition-all duration-300"
              >
                Watch Demo
              </Button>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Floating Elements */}
        <motion.div
          className="absolute top-20 left-20 w-32 h-32 bg-primary/10 rounded-full blur-xl"
          animate={{ y: [-20, 20, -20] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-40 h-40 bg-accent/10 rounded-full blur-xl"
          animate={{ y: [20, -20, 20] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 bg-secondary/30">
        <div className="container mx-auto px-6" style={{ maxWidth: '100rem' }}>
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-20"
          >
            <motion.h2 
              variants={fadeInUp}
              className="font-heading text-5xl md:text-6xl font-bold text-secondary-foreground mb-6"
            >
              Powerful Features for Your Success
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="font-paragraph text-xl text-secondary-foreground/70 max-w-3xl mx-auto"
            >
              Discover cutting-edge tools designed to accelerate your career growth and skill development
            </motion.p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {features.length > 0 ? features.map((feature, index) => (
              <motion.div key={feature._id} variants={fadeInUp}>
                <Card className="h-full bg-background border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
                  <CardContent className="p-8 text-center">
                    <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Image 
                        src={feature.icon} 
                        alt={feature.featureName}
                        width={40}
                        className="w-10 h-10 text-primary-foreground"
                      />
                    </div>
                    <h3 className="font-heading text-2xl font-bold text-secondary-foreground mb-4">
                      {feature.featureName}
                    </h3>
                    <p className="font-paragraph text-secondary-foreground/70 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )) : (
              // Default features if none loaded from CMS
              [
                { icon: Brain, title: "Skill Mapping", description: "AI-powered analysis of your current skills and identification of growth opportunities" },
                { icon: MapPin, title: "Career Path Suggestions", description: "Personalized career recommendations based on your profile and market trends" },
                { icon: FileText, title: "Resume Analyzer", description: "Comprehensive resume analysis with actionable improvement suggestions" },
                { icon: BookOpen, title: "Learning Plans", description: "Customized learning paths to bridge skill gaps and achieve career goals" }
              ].map((feature, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <Card className="h-full bg-background border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
                    <CardContent className="p-8 text-center">
                      <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <feature.icon className="w-10 h-10 text-primary-foreground" />
                      </div>
                      <h3 className="font-heading text-2xl font-bold text-secondary-foreground mb-4">
                        {feature.title}
                      </h3>
                      <p className="font-paragraph text-secondary-foreground/70 leading-relaxed">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </motion.div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-32 bg-background">
        <div className="container mx-auto px-6" style={{ maxWidth: '100rem' }}>
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-6xl mx-auto"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div variants={fadeInUp}>
                <h2 className="font-heading text-5xl md:text-6xl font-bold text-secondary-foreground mb-8">
                  Empowering Careers with
                  <span className="block text-primary">AI Intelligence</span>
                </h2>
                <p className="font-paragraph text-xl text-secondary-foreground/80 mb-8 leading-relaxed">
                  Our mission is to revolutionize career development by leveraging artificial intelligence 
                  to provide personalized guidance for students and professionals. We believe everyone 
                  deserves access to intelligent career insights that can transform their professional journey.
                </p>
                <div className="space-y-4">
                  {[
                    "AI-driven career recommendations",
                    "Personalized skill development plans",
                    "Industry-leading resume analysis",
                    "Real-time market insights"
                  ].map((item, index) => (
                    <motion.div 
                      key={index}
                      className="flex items-center gap-4"
                      variants={fadeInUp}
                    >
                      <CheckCircle className="w-6 h-6 text-primary flex-shrink-0" />
                      <span className="font-paragraph text-lg text-secondary-foreground/80">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              
              <motion.div 
                variants={fadeInUp}
                className="relative"
              >
                <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl p-8 h-96 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                      <Target className="w-16 h-16 text-primary-foreground" />
                    </div>
                    <h3 className="font-heading text-2xl font-bold text-secondary-foreground mb-4">
                      10,000+ Careers Transformed
                    </h3>
                    <p className="font-paragraph text-secondary-foreground/70">
                      Join thousands who've accelerated their career growth with our AI-powered platform
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-32 bg-gradient-to-br from-secondary/50 to-primary/5">
        <div className="container mx-auto px-6" style={{ maxWidth: '100rem' }}>
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-20"
          >
            <motion.h2 
              variants={fadeInUp}
              className="font-heading text-5xl md:text-6xl font-bold text-secondary-foreground mb-6"
            >
              How It Works
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="font-paragraph text-xl text-secondary-foreground/70 max-w-3xl mx-auto"
            >
              Get started in three simple steps and unlock your career potential
            </motion.p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-12"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {[
              {
                step: "01",
                icon: Upload,
                title: "Upload Resume",
                description: "Upload your resume and let our AI analyze your skills, experience, and career trajectory"
              },
              {
                step: "02",
                icon: Lightbulb,
                title: "Get AI Suggestions",
                description: "Receive personalized career recommendations and skill development plans based on market data"
              },
              {
                step: "03",
                icon: Target,
                title: "Explore Career Paths",
                description: "Discover new opportunities, connect with mentors, and take action on your career goals"
              }
            ].map((item, index) => (
              <motion.div key={index} variants={fadeInUp} className="text-center relative">
                <div className="relative mb-8">
                  <div className="w-32 h-32 mx-auto bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center shadow-xl">
                    <item.icon className="w-16 h-16 text-primary-foreground" />
                  </div>
                  <div className="absolute -top-4 -right-4 w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                    <span className="font-heading text-lg font-bold text-primary-foreground">{item.step}</span>
                  </div>
                </div>
                <h3 className="font-heading text-3xl font-bold text-secondary-foreground mb-4">
                  {item.title}
                </h3>
                <p className="font-paragraph text-lg text-secondary-foreground/70 leading-relaxed">
                  {item.description}
                </p>
                {index < 2 && (
                  <div className="hidden md:block absolute top-16 -right-6 w-12 h-0.5 bg-gradient-to-r from-primary to-accent"></div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32 bg-background">
        <div className="container mx-auto px-6" style={{ maxWidth: '100rem' }}>
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-20"
          >
            <motion.h2 
              variants={fadeInUp}
              className="font-heading text-5xl md:text-6xl font-bold text-secondary-foreground mb-6"
            >
              What Our Users Say
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="font-paragraph text-xl text-secondary-foreground/70 max-w-3xl mx-auto"
            >
              Real stories from professionals who transformed their careers with our platform
            </motion.p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {testimonials.length > 0 ? testimonials.map((testimonial) => (
              <motion.div key={testimonial._id} variants={fadeInUp}>
                <Card className="h-full bg-background border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <CardContent className="p-8">
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    <p className="font-paragraph text-secondary-foreground/80 mb-6 leading-relaxed">
                      "{testimonial.reviewText}"
                    </p>
                    <div className="flex items-center gap-4">
                      <Image 
                        src={testimonial.profilePhoto} 
                        alt={testimonial.reviewerName}
                        width={48}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="font-heading font-semibold text-secondary-foreground">
                          {testimonial.reviewerName}
                        </h4>
                        <p className="font-paragraph text-sm text-secondary-foreground/60">
                          {testimonial.reviewerTitle}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )) : (
              // Default testimonials if none loaded from CMS
              [
                {
                  name: "Sarah Johnson",
                  title: "Software Engineer",
                  review: "This platform helped me transition from marketing to tech. The AI recommendations were spot-on!",
                  rating: 5,
                  image: "https://static.wixstatic.com/media/8b9e83_0f311809b65e402dbbb7a823bbb3234f~mv2.png?originWidth=192&originHeight=192"
                },
                {
                  name: "Michael Chen",
                  title: "Data Scientist",
                  review: "The skill mapping feature identified gaps I didn't even know I had. Game-changer for my career!",
                  rating: 5,
                  image: "https://static.wixstatic.com/media/8b9e83_8dc8c1d3263a4390bcdad57cfe3cbe08~mv2.png?originWidth=192&originHeight=192"
                },
                {
                  name: "Emily Rodriguez",
                  title: "Product Manager",
                  review: "From resume analysis to career planning, everything is personalized and actionable.",
                  rating: 5,
                  image: "https://static.wixstatic.com/media/8b9e83_3edfcb0ce9c441bbbe5c552dfffc44b4~mv2.png?originWidth=192&originHeight=192"
                },
                {
                  name: "David Kim",
                  title: "UX Designer",
                  review: "The learning plans are incredibly detailed and helped me land my dream job!",
                  rating: 5,
                  image: "https://static.wixstatic.com/media/8b9e83_691f78e6103745a2a7a591a6f199db60~mv2.png?originWidth=192&originHeight=192"
                }
              ].map((testimonial, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <Card className="h-full bg-background border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                    <CardContent className="p-8">
                      <div className="flex mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                      <p className="font-paragraph text-secondary-foreground/80 mb-6 leading-relaxed">
                        "{testimonial.review}"
                      </p>
                      <div className="flex items-center gap-4">
                        <Image 
                          src={testimonial.image} 
                          alt={testimonial.name}
                          width={48}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <h4 className="font-heading font-semibold text-secondary-foreground">
                            {testimonial.name}
                          </h4>
                          <p className="font-paragraph text-sm text-secondary-foreground/60">
                            {testimonial.title}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container mx-auto px-6" style={{ maxWidth: '100rem' }}>
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-4xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <h2 className="font-heading text-5xl md:text-6xl font-bold text-secondary-foreground mb-6">
                Ready to Transform Your Career?
              </h2>
              <p className="font-paragraph text-xl text-secondary-foreground/70">
                Get in touch with us and start your journey to career success
              </p>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="bg-background border-0 shadow-xl">
                <CardContent className="p-12">
                  <form onSubmit={handleContactSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <label className="font-paragraph text-lg font-semibold text-secondary-foreground mb-3 block">
                          Name
                        </label>
                        <Input
                          type="text"
                          value={contactForm.name}
                          onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                          className="h-14 text-lg border-2 border-secondary focus:border-primary rounded-xl"
                          placeholder="Your full name"
                          required
                        />
                      </div>
                      <div>
                        <label className="font-paragraph text-lg font-semibold text-secondary-foreground mb-3 block">
                          Email
                        </label>
                        <Input
                          type="email"
                          value={contactForm.email}
                          onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                          className="h-14 text-lg border-2 border-secondary focus:border-primary rounded-xl"
                          placeholder="your.email@example.com"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="font-paragraph text-lg font-semibold text-secondary-foreground mb-3 block">
                        Message
                      </label>
                      <Textarea
                        value={contactForm.message}
                        onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                        className="min-h-32 text-lg border-2 border-secondary focus:border-primary rounded-xl resize-none"
                        placeholder="Tell us about your career goals and how we can help..."
                        required
                      />
                    </div>
                    <div className="text-center">
                      <Button 
                        type="submit"
                        size="lg"
                        className="bg-primary hover:bg-primary/90 text-primary-foreground px-12 py-6 text-xl font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                      >
                        Send Message
                        <ArrowRight className="ml-3 h-6 w-6" />
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}