import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { User, Mail, MessageCircle, CreditCard, Shield, Smartphone } from 'lucide-react';
import {
  Drawer,
  DrawerContent,
  DrawerOverlay,
  DrawerTrigger,
  DrawerHeader,
  DrawerFooter,
  DrawerHandle,
  useKeyboardHeight
} from '../components/drawer';

export function FormExamplesPage() {
  return (
    <div className="space-y-12">
      {/* Page Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">Form Integration Examples</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Comprehensive examples showing how to integrate forms with the iOS drawer component,
          including keyboard handling, validation, and mobile optimization.
        </p>
      </div>

      {/* Contact Form */}
      <ExampleSection
        title="1. Contact Form with Validation"
        description="Complete form with real-time validation and iOS keyboard handling."
        icon={<Mail className="w-6 h-6" />}
      >
        <ContactFormExample />
      </ExampleSection>

      {/* Multi-step Form */}
      <ExampleSection
        title="2. Multi-Step Form"
        description="Complex form broken into multiple steps with dynamic height adjustment."
        icon={<User className="w-6 h-6" />}
      >
        <MultiStepFormExample />
      </ExampleSection>

      {/* iOS Keyboard Test */}
      <ExampleSection
        title="3. iOS Keyboard Handling"
        description="Demonstrates automatic keyboard detection and drawer adjustment on iOS devices."
        icon={<Smartphone className="w-6 h-6" />}
      >
        <IOSKeyboardExample />
      </ExampleSection>

      {/* Payment Form */}
      <ExampleSection
        title="4. Payment Form"
        description="Secure payment form with card validation and formatting."
        icon={<CreditCard className="w-6 h-6" />}
      >
        <PaymentFormExample />
      </ExampleSection>

      {/* Survey Form */}
      <ExampleSection
        title="5. Dynamic Survey Form"
        description="Survey with conditional questions and dynamic snap points."
        icon={<MessageCircle className="w-6 h-6" />}
      >
        <SurveyFormExample />
      </ExampleSection>

      {/* Login Form */}
      <ExampleSection
        title="6. Login/Registration Form"
        description="Authentication forms with security features and social login."
        icon={<Shield className="w-6 h-6" />}
      >
        <AuthFormExample />
      </ExampleSection>
    </div>
  );
}

// Helper Components
function ExampleSection({ 
  title, 
  description, 
  icon, 
  children 
}: { 
  title: string; 
  description: string; 
  icon: React.ReactNode; 
  children: React.ReactNode; 
}) {
  return (
    <section className="space-y-6">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 p-2 bg-blue-100 rounded-lg text-blue-600">
          {icon}
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          <p className="text-gray-600 mt-2">{description}</p>
        </div>
      </div>
      <div className="space-y-6">
        {children}
      </div>
    </section>
  );
}

function CodeBlock({ children }: { children: string }) {
  return (
    <div className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto">
      <pre className="text-sm">{children}</pre>
    </div>
  );
}

// Contact Form Example
function ContactFormExample() {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
      priority: 'medium'
    }
  });

  const watchedValues = watch();

  const onSubmit = async (data: any) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('Form submitted:', data);
    alert('Message sent successfully!');
    setOpen(false);
    reset();
  };

  return (
    <div className="space-y-4">
      <Drawer open={open} onOpenChange={setOpen} handleKeyboard>
        <DrawerTrigger className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
          Open Contact Form
        </DrawerTrigger>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>
            <h3 className="text-xl font-semibold text-gray-900">Contact Us</h3>
            <p className="text-gray-600">We'd love to hear from you!</p>
          </DrawerHeader>
          
          <form onSubmit={handleSubmit(onSubmit)} className="flex-1 flex flex-col">
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  {...register('name', { 
                    required: 'Name is required',
                    minLength: { value: 2, message: 'Name must be at least 2 characters' }
                  })}
                  type="text"
                  id="name"
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="John Doe"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: { 
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 
                      message: 'Invalid email address' 
                    }
                  })}
                  type="email"
                  id="email"
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="john@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              {/* Subject Field */}
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject *
                </label>
                <select
                  {...register('subject', { required: 'Please select a subject' })}
                  id="subject"
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.subject ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="support">Technical Support</option>
                  <option value="billing">Billing Question</option>
                  <option value="feature">Feature Request</option>
                  <option value="bug">Bug Report</option>
                </select>
                {errors.subject && (
                  <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>
                )}
              </div>

              {/* Priority */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                <div className="flex space-x-4">
                  {['low', 'medium', 'high'].map((priority) => (
                    <label key={priority} className="flex items-center">
                      <input
                        {...register('priority')}
                        type="radio"
                        value={priority}
                        className="mr-2 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700 capitalize">{priority}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message *
                </label>
                <textarea
                  {...register('message', { 
                    required: 'Message is required',
                    minLength: { value: 10, message: 'Message must be at least 10 characters' }
                  })}
                  id="message"
                  rows={4}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition-colors ${
                    errors.message ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Your message here..."
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                )}
                <p className="mt-1 text-xs text-gray-500">
                  {watchedValues.message?.length || 0}/500 characters
                </p>
              </div>

              {/* Form Preview */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Form Preview</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <div>Name: {watchedValues.name || 'Not entered'}</div>
                  <div>Email: {watchedValues.email || 'Not entered'}</div>
                  <div>Subject: {watchedValues.subject || 'Not selected'}</div>
                  <div>Priority: {watchedValues.priority}</div>
                </div>
              </div>
            </div>
            
            <DrawerFooter>
              <div className="flex flex-col-reverse sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-6 py-3 text-gray-700 bg-gray-300 hover:bg-gray-400 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </DrawerFooter>
          </form>
        </DrawerContent>
      </Drawer>

      <CodeBlock>
{`import { useForm } from 'react-hook-form';

function ContactForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const onSubmit = async (data) => {
    console.log('Form data:', data);
  };

  return (
    <Drawer handleKeyboard>
      <DrawerContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register('name', { required: 'Name is required' })}
            placeholder="Your name"
          />
          {errors.name && <span>{errors.name.message}</span>}
          
          <button type="submit">Submit</button>
        </form>
      </DrawerContent>
    </Drawer>
  );
}`}
      </CodeBlock>
    </div>
  );
}

// Multi-Step Form Example
function MultiStepFormExample() {
  const [open, setOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Personal Info
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    
    // Step 2: Address
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
    
    // Step 3: Preferences
    newsletter: true,
    notifications: false,
    theme: 'light',
    language: 'en'
  });

  const totalSteps = 3;
  const progress = (currentStep / totalSteps) * 100;

  // Dynamic snap points based on step
  const snapPoints = React.useMemo(() => {
    switch (currentStep) {
      case 1: return ['50%', '70%'];
      case 2: return ['60%', '80%'];
      case 3: return ['55%', '75%'];
      default: return ['50%', '70%'];
    }
  }, [currentStep]);

  const nextStep = () => {
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleFinish = () => {
    console.log('Final form data:', formData);
    alert('Account created successfully!');
    setOpen(false);
    setCurrentStep(1);
    setFormData({
      firstName: '', lastName: '', email: '', phone: '',
      address: '', city: '', state: '', zipCode: '', country: 'US',
      newsletter: true, notifications: false, theme: 'light', language: 'en'
    });
  };

  return (
    <div className="space-y-4">
      <Drawer 
        open={open} 
        onOpenChange={setOpen}
        snapPoints={snapPoints}
        defaultSnapPoint={0}
      >
        <DrawerTrigger className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
          Create Account
        </DrawerTrigger>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHandle />
          <DrawerHeader>
            <h3 className="text-xl font-semibold text-gray-900">Create Account</h3>
            <div className="mt-3">
              <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                <span>Step {currentStep} of {totalSteps}</span>
                <span>{Math.round(progress)}% complete</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </DrawerHeader>

          <div className="flex-1 overflow-y-auto p-6">
            {currentStep === 1 && (
              <PersonalInfoStep formData={formData} setFormData={setFormData} />
            )}
            {currentStep === 2 && (
              <AddressStep formData={formData} setFormData={setFormData} />
            )}
            {currentStep === 3 && (
              <PreferencesStep formData={formData} setFormData={setFormData} />
            )}
          </div>

          <DrawerFooter>
            <div className="flex justify-between gap-3">
              <button
                onClick={currentStep === 1 ? () => setOpen(false) : prevStep}
                className="px-6 py-3 text-gray-700 bg-gray-300 hover:bg-gray-400 rounded-lg font-medium transition-colors"
              >
                {currentStep === 1 ? 'Cancel' : 'Previous'}
              </button>
              <button
                onClick={currentStep === totalSteps ? handleFinish : nextStep}
                className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
              >
                {currentStep === totalSteps ? 'Create Account' : 'Next'}
              </button>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <CodeBlock>
{`function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  
  const snapPoints = useMemo(() => {
    switch (step) {
      case 1: return ['50%', '70%'];
      case 2: return ['60%', '80%'];
      case 3: return ['55%', '75%'];
      default: return ['50%', '70%'];
    }
  }, [step]);

  return (
    <Drawer snapPoints={snapPoints}>
      <DrawerContent>
        <DrawerHandle />
        {step === 1 && <StepOne />}
        {step === 2 && <StepTwo />}
        {step === 3 && <StepThree />}
      </DrawerContent>
    </Drawer>
  );
}`}
      </CodeBlock>
    </div>
  );
}

// iOS Keyboard Example
function IOSKeyboardExample() {
  const [open, setOpen] = useState(false);
  const { keyboardHeight, isKeyboardVisible, availableHeight } = useKeyboardHeight({
    enabled: open
  });

  return (
    <div className="space-y-4">
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <h4 className="font-semibold text-blue-900 mb-2">Current Status</h4>
        <div className="text-blue-800 text-sm space-y-1">
          <div>Keyboard Visible: <strong>{isKeyboardVisible ? 'Yes' : 'No'}</strong></div>
          <div>Keyboard Height: <strong>{keyboardHeight}px</strong></div>
          <div>Available Height: <strong>{availableHeight}px</strong></div>
        </div>
      </div>

      <Drawer open={open} onOpenChange={setOpen} handleKeyboard>
        <DrawerTrigger className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
          Test iOS Keyboard
        </DrawerTrigger>
        <DrawerOverlay />
        <DrawerContent
          style={{
            paddingBottom: isKeyboardVisible ? keyboardHeight : undefined
          }}
        >
          <DrawerHeader>
            <h3 className="text-xl font-semibold text-gray-900">iOS Keyboard Test</h3>
            <p className="text-gray-600">
              Test keyboard detection on iOS devices
            </p>
            {isKeyboardVisible && (
              <div className="bg-green-100 border border-green-300 rounded-lg p-2 mt-2">
                <p className="text-green-800 text-sm font-medium">
                  ✅ Keyboard detected! Height: {keyboardHeight}px
                </p>
              </div>
            )}
          </DrawerHeader>
          
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <h4 className="font-semibold text-purple-900 mb-2">Test Instructions</h4>
              <ul className="text-purple-800 text-sm space-y-1">
                <li>• Tap on the input fields below</li>
                <li>• Watch the drawer adjust automatically</li>
                <li>• Works on iPhone and iPad</li>
                <li>• Supports all iOS browsers</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="Your name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="(555) 123-4567"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 resize-none"
                  placeholder="Your message..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Number</label>
                <input
                  type="number"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter a number"
                />
              </div>
            </div>
          </div>
          
          <DrawerFooter>
            <button
              onClick={() => setOpen(false)}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-lg font-medium transition-colors"
            >
              Close
            </button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <CodeBlock>
{`import { useKeyboardHeight } from '@ios-drawer/react';

function IOSKeyboardForm() {
  const { keyboardHeight, isKeyboardVisible } = useKeyboardHeight();
  
  return (
    <Drawer handleKeyboard>
      <DrawerContent
        style={{
          paddingBottom: isKeyboardVisible ? keyboardHeight : 0
        }}
      >
        <input type="text" placeholder="Auto-adjusts for keyboard" />
      </DrawerContent>
    </Drawer>
  );
}`}
      </CodeBlock>
    </div>
  );
}

// Additional Step Components for Multi-step Form
function PersonalInfoStep({ formData, setFormData }: any) {
  return (
    <div className="space-y-4">
      <h4 className="font-semibold text-gray-900 text-lg">Personal Information</h4>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => setFormData({...formData, firstName: e.target.value})}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            placeholder="John"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => setFormData({...formData, lastName: e.target.value})}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            placeholder="Doe"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
          placeholder="john@example.com"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({...formData, phone: e.target.value})}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
          placeholder="(555) 123-4567"
        />
      </div>
    </div>
  );
}

function AddressStep({ formData, setFormData }: any) {
  return (
    <div className="space-y-4">
      <h4 className="font-semibold text-gray-900 text-lg">Address Information</h4>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
        <input
          type="text"
          value={formData.address}
          onChange={(e) => setFormData({...formData, address: e.target.value})}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
          placeholder="123 Main St"
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
          <input
            type="text"
            value={formData.city}
            onChange={(e) => setFormData({...formData, city: e.target.value})}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            placeholder="New York"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
          <select
            value={formData.state}
            onChange={(e) => setFormData({...formData, state: e.target.value})}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
          >
            <option value="">Select State</option>
            <option value="NY">New York</option>
            <option value="CA">California</option>
            <option value="TX">Texas</option>
            <option value="FL">Florida</option>
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
          <input
            type="text"
            value={formData.zipCode}
            onChange={(e) => setFormData({...formData, zipCode: e.target.value})}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            placeholder="10001"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
          <select
            value={formData.country}
            onChange={(e) => setFormData({...formData, country: e.target.value})}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
          >
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="UK">United Kingdom</option>
            <option value="AU">Australia</option>
          </select>
        </div>
      </div>
    </div>
  );
}

function PreferencesStep({ formData, setFormData }: any) {
  return (
    <div className="space-y-4">
      <h4 className="font-semibold text-gray-900 text-lg">Preferences</h4>
      
      <div className="space-y-3">
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={formData.newsletter}
            onChange={(e) => setFormData({...formData, newsletter: e.target.checked})}
            className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
          />
          <span className="text-gray-700">Subscribe to newsletter</span>
        </label>
        
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={formData.notifications}
            onChange={(e) => setFormData({...formData, notifications: e.target.checked})}
            className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
          />
          <span className="text-gray-700">Enable push notifications</span>
        </label>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Theme Preference</label>
        <div className="grid grid-cols-2 gap-2">
          {['light', 'dark'].map((theme) => (
            <label key={theme} className="flex items-center space-x-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="theme"
                value={theme}
                checked={formData.theme === theme}
                onChange={(e) => setFormData({...formData, theme: e.target.value})}
                className="text-green-600 focus:ring-green-500"
              />
              <span className="capitalize">{theme}</span>
            </label>
          ))}
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
        <select
          value={formData.language}
          onChange={(e) => setFormData({...formData, language: e.target.value})}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
        >
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
        </select>
      </div>
    </div>
  );
}

// Payment Form Example
function PaymentFormExample() {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-4">
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
          Secure Payment Form
        </DrawerTrigger>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>
            <h3 className="text-xl font-semibold text-gray-900">Payment Information</h3>
            <p className="text-gray-600">Your payment is secure and encrypted</p>
          </DrawerHeader>
          
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-emerald-600" />
                <span className="font-medium text-emerald-900">Secure Payment</span>
              </div>
              <p className="text-emerald-800 text-sm mt-1">
                Your information is protected with 256-bit SSL encryption
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                placeholder="1234 5678 9012 3456"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Expiry</label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  placeholder="MM/YY"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  placeholder="123"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name</label>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                placeholder="John Doe"
              />
            </div>
          </div>
          
          <DrawerFooter>
            <button
              onClick={() => setOpen(false)}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-3 rounded-lg font-medium transition-colors"
            >
              Process Payment
            </button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <CodeBlock>
{`function PaymentForm() {
  return (
    <Drawer handleKeyboard>
      <DrawerContent>
        <div className="bg-emerald-50 p-4 rounded-lg">
          <div className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-emerald-600" />
            <span>Secure Payment</span>
          </div>
        </div>
        
        <input type="text" placeholder="Card Number" />
        <input type="text" placeholder="MM/YY" />
        <input type="text" placeholder="CVV" />
        
        <button>Process Payment</button>
      </DrawerContent>
    </Drawer>
  );
}`}
      </CodeBlock>
    </div>
  );
}

// Survey Form Example
function SurveyFormExample() {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-4">
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
          Quick Survey
        </DrawerTrigger>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>
            <h3 className="text-xl font-semibold text-gray-900">Customer Survey</h3>
            <p className="text-gray-600">Help us improve our service</p>
          </DrawerHeader>
          
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-3">
                How would you rate our service?
              </h4>
              <div className="space-y-2">
                {['Excellent', 'Good', 'Fair', 'Poor'].map((rating) => (
                  <label key={rating} className="flex items-center space-x-3 p-2 border rounded cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="rating"
                      value={rating}
                      className="text-orange-600 focus:ring-orange-500"
                    />
                    <span>{rating}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-3">
                Additional feedback
              </h4>
              <textarea
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 resize-none"
                placeholder="Tell us more about your experience..."
              />
            </div>
          </div>
          
          <DrawerFooter>
            <button
              onClick={() => setOpen(false)}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white px-4 py-3 rounded-lg font-medium transition-colors"
            >
              Submit Survey
            </button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <CodeBlock>
{`function SurveyForm() {
  return (
    <Drawer>
      <DrawerContent>
        <h3>How would you rate our service?</h3>
        {['Excellent', 'Good', 'Fair', 'Poor'].map((rating) => (
          <label key={rating}>
            <input type="radio" name="rating" value={rating} />
            {rating}
          </label>
        ))}
        
        <textarea placeholder="Additional feedback..." />
        <button>Submit Survey</button>
      </DrawerContent>
    </Drawer>
  );
}`}
      </CodeBlock>
    </div>
  );
}

// Auth Form Example
function AuthFormExample() {
  const [open, setOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="space-y-4">
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger className="bg-slate-600 hover:bg-slate-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
          Login / Register
        </DrawerTrigger>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>
            <div className="flex items-center justify-center space-x-4 mb-4">
              <button
                onClick={() => setIsLogin(true)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  isLogin ? 'bg-slate-600 text-white' : 'bg-gray-200 text-gray-700'
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  !isLogin ? 'bg-slate-600 text-white' : 'bg-gray-200 text-gray-700'
                }`}
              >
                Register
              </button>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 text-center">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h3>
            <p className="text-gray-600 text-center">
              {isLogin ? 'Sign in to your account' : 'Join us today'}
            </p>
          </DrawerHeader>
          
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500"
                  placeholder="John Doe"
                />
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500"
                placeholder="john@example.com"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500"
                placeholder="••••••••"
              />
            </div>
            
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                <input
                  type="password"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500"
                  placeholder="••••••••"
                />
              </div>
            )}
            
            {isLogin && (
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm text-gray-700">Remember me</span>
                </label>
                <button className="text-sm text-slate-600 hover:text-slate-700">
                  Forgot password?
                </button>
              </div>
            )}
          </div>
          
          <DrawerFooter>
            <button
              onClick={() => setOpen(false)}
              className="w-full bg-slate-600 hover:bg-slate-700 text-white px-4 py-3 rounded-lg font-medium transition-colors mb-3"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
            
            <div className="text-center text-sm text-gray-600">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-slate-600 hover:text-slate-700 font-medium"
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <CodeBlock>
{`function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  
  return (
    <Drawer handleKeyboard>
      <DrawerContent>
        <div className="flex space-x-4 mb-4">
          <button onClick={() => setIsLogin(true)}>Login</button>
          <button onClick={() => setIsLogin(false)}>Register</button>
        </div>
        
        {!isLogin && <input type="text" placeholder="Full Name" />}
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        {!isLogin && <input type="password" placeholder="Confirm" />}
        
        <button>{isLogin ? 'Sign In' : 'Create Account'}</button>
      </DrawerContent>
    </Drawer>
  );
}`}
      </CodeBlock>
    </div>
  );
}