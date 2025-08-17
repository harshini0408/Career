import { motion } from 'framer-motion';
import { useMember } from '@/integrations';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { 
  User, 
  Mail, 
  Calendar, 
  Settings, 
  Award, 
  Target,
  TrendingUp,
  BookOpen
} from 'lucide-react';

export default function ProfilePage() {
  const { member } = useMember();

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
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-6" style={{ maxWidth: '100rem' }}>
        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerContainer}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <h1 className="font-heading text-5xl md:text-6xl font-bold text-secondary-foreground mb-4">
              Your Profile
            </h1>
            <p className="font-paragraph text-xl text-secondary-foreground/70">
              Manage your career journey and track your progress
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Info Card */}
            <motion.div variants={fadeInUp} className="lg:col-span-1">
              <Card className="bg-background border-0 shadow-lg">
                <CardContent className="p-8 text-center">
                  <div className="mb-6">
                    {member?.profile?.photo?.url ? (
                      <Image
                        src={member.profile.photo.url}
                        alt={member?.profile?.nickname || 'Profile'}
                        width={120}
                        className="w-30 h-30 rounded-full mx-auto object-cover border-4 border-primary/20"
                      />
                    ) : (
                      <div className="w-30 h-30 mx-auto bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                        <User className="w-16 h-16 text-primary-foreground" />
                      </div>
                    )}
                  </div>
                  
                  <h2 className="font-heading text-3xl font-bold text-secondary-foreground mb-2">
                    {member?.profile?.nickname || 
                     `${member?.contact?.firstName || ''} ${member?.contact?.lastName || ''}`.trim() || 
                     'Welcome!'}
                  </h2>
                  
                  {member?.profile?.title && (
                    <p className="font-paragraph text-lg text-secondary-foreground/70 mb-4">
                      {member.profile.title}
                    </p>
                  )}
                  
                  <div className="space-y-3 mb-6">
                    {member?.loginEmail && (
                      <div className="flex items-center justify-center gap-3 text-secondary-foreground/70">
                        <Mail className="w-5 h-5" />
                        <span className="font-paragraph">{member.loginEmail}</span>
                      </div>
                    )}
                    
                    {member?._createdDate && (
                      <div className="flex items-center justify-center gap-3 text-secondary-foreground/70">
                        <Calendar className="w-5 h-5" />
                        <span className="font-paragraph">
                          Member since {new Date(member._createdDate).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl">
                    <Settings className="w-5 h-5 mr-2" />
                    Edit Profile
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Dashboard Cards */}
            <motion.div variants={fadeInUp} className="lg:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Career Progress */}
                <Card className="bg-background border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-3 font-heading text-xl text-secondary-foreground">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-primary" />
                      </div>
                      Career Progress
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-paragraph text-sm text-secondary-foreground/70">Profile Completion</span>
                          <span className="font-paragraph text-sm font-semibold text-secondary-foreground">75%</span>
                        </div>
                        <div className="w-full bg-secondary rounded-full h-2">
                          <div className="bg-primary h-2 rounded-full" style={{ width: '75%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-paragraph text-sm text-secondary-foreground/70">Skills Assessment</span>
                          <span className="font-paragraph text-sm font-semibold text-secondary-foreground">60%</span>
                        </div>
                        <div className="w-full bg-secondary rounded-full h-2">
                          <div className="bg-accent h-2 rounded-full" style={{ width: '60%' }}></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Achievements */}
                <Card className="bg-background border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-3 font-heading text-xl text-secondary-foreground">
                      <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                        <Award className="w-5 h-5 text-accent" />
                      </div>
                      Achievements
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg">
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold text-primary-foreground">1</span>
                        </div>
                        <span className="font-paragraph text-sm text-secondary-foreground">Profile Created</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg opacity-50">
                        <div className="w-8 h-8 bg-secondary-foreground/20 rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold text-secondary-foreground/50">2</span>
                        </div>
                        <span className="font-paragraph text-sm text-secondary-foreground/50">First Assessment</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Career Goals */}
                <Card className="bg-background border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-3 font-heading text-xl text-secondary-foreground">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Target className="w-5 h-5 text-primary" />
                      </div>
                      Career Goals
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="font-paragraph text-sm text-secondary-foreground/70 mb-4">
                        Set and track your career objectives
                      </p>
                      <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                        Set Career Goals
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Learning Path */}
                <Card className="bg-background border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-3 font-heading text-xl text-secondary-foreground">
                      <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-accent" />
                      </div>
                      Learning Path
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="font-paragraph text-sm text-secondary-foreground/70 mb-4">
                        Personalized learning recommendations
                      </p>
                      <Button variant="outline" className="w-full border-accent text-accent hover:bg-accent hover:text-primary-foreground">
                        View Recommendations
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>

          {/* Quick Actions */}
          <motion.div variants={fadeInUp} className="mt-12">
            <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-0 shadow-lg">
              <CardContent className="p-8">
                <h3 className="font-heading text-2xl font-bold text-secondary-foreground mb-6 text-center">
                  Quick Actions
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Button className="h-16 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl text-lg font-semibold">
                    Upload Resume
                  </Button>
                  <Button className="h-16 bg-accent hover:bg-accent/90 text-primary-foreground rounded-xl text-lg font-semibold">
                    Take Skills Assessment
                  </Button>
                  <Button className="h-16 bg-secondary-foreground hover:bg-secondary-foreground/90 text-primary-foreground rounded-xl text-lg font-semibold">
                    Explore Career Paths
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}