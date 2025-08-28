import React, { useState, useRef } from 'react';
import {
  Drawer,
  DrawerContent,
  DrawerOverlay,
  DrawerTrigger,
  DrawerHeader,
  DrawerFooter,
  DrawerHandle,
  useKeyboardHeight
} from '../src';

/**
 * Form Examples
 * Demonstrates using drawers with forms, including iOS keyboard handling
 */
export function WithFormsExample() {
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-2xl font-bold mb-6">Drawer with Forms</h1>
      
      {/* Contact Form */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Contact Form</h2>
        <ContactFormExample />
      </div>

      {/* Multi-step Form */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Multi-step Form</h2>
        <MultiStepFormExample />
      </div>

      {/* iOS Keyboard-aware Form */}
      <div>
        <h2 className="text-lg font-semibold mb-4">iOS Keyboard-aware Form</h2>
        <KeyboardAwareFormExample />
      </div>

      {/* Survey Form with Snap Points */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Survey Form with Dynamic Height</h2>
        <SurveyFormExample />
      </div>
    </div>
  );
}

/**
 * Contact Form Example
 * Basic form with validation and submission
 */
function ContactFormExample() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log('Form submitted:', formData);
      alert('Message sent successfully!');
      setOpen(false);
      setFormData({ name: '', email: '', message: '' });
      setErrors({});
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <Drawer open={open} onOpenChange={setOpen} handleKeyboard>
      <DrawerTrigger className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
        Contact Us
      </DrawerTrigger>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader>
          <h3 className="text-xl font-semibold">Contact Us</h3>
          <p className="text-gray-600">We'd love to hear from you!</p>
        </DrawerHeader>
        
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name *
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Your name"
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="your.email@example.com"
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message *
              </label>
              <textarea
                id="message"
                rows={4}
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none ${
                  errors.message ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Your message..."
              />
              {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
            </div>
          </div>

          <DrawerFooter>
            <div className="flex flex-col-reverse sm:flex-row gap-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="px-4 py-2 text-gray-700 bg-gray-300 hover:bg-gray-400 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
              >
                Send Message
              </button>
            </div>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
}

/**
 * Multi-step Form Example
 * Shows a form with multiple steps and progress indication
 */
function MultiStepFormExample() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Personal Info
    firstName: '',
    lastName: '',
    email: '',
    
    // Step 2: Address
    address: '',
    city: '',
    zipCode: '',
    
    // Step 3: Preferences
    newsletter: false,
    notifications: false,
    theme: 'light'
  });

  const totalSteps = 3;

  const nextStep = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    console.log('Multi-step form submitted:', formData);
    alert('Account created successfully!');
    setOpen(false);
    setStep(1);
    setFormData({
      firstName: '', lastName: '', email: '',
      address: '', city: '', zipCode: '',
      newsletter: false, notifications: false, theme: 'light'
    });
  };

  // Dynamic snap points based on step
  const snapPoints = React.useMemo(() => {
    switch (step) {
      case 1: return ['50%', '70%'];
      case 2: return ['55%', '75%'];
      case 3: return ['60%', '80%'];
      default: return ['50%', '70%'];
    }
  }, [step]);

  return (
    <Drawer open={open} onOpenChange={setOpen} snapPoints={snapPoints} defaultSnapPoint={0}>
      <DrawerTrigger className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
        Create Account
      </DrawerTrigger>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHandle />
        <DrawerHeader>
          <h3 className="text-xl font-semibold">Create Account</h3>
          <div className="flex items-center space-x-2 mt-2">
            <span className="text-sm text-gray-600">Step {step} of {totalSteps}</span>
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(step / totalSteps) * 100}%` }}
              />
            </div>
          </div>
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto p-4">
          {step === 1 && (
            <PersonalInfoStep formData={formData} setFormData={setFormData} />
          )}
          {step === 2 && (
            <AddressStep formData={formData} setFormData={setFormData} />
          )}
          {step === 3 && (
            <PreferencesStep formData={formData} setFormData={setFormData} />
          )}
        </div>

        <DrawerFooter>
          <div className="flex justify-between">
            <button
              onClick={step === 1 ? () => setOpen(false) : prevStep}
              className="px-4 py-2 text-gray-700 bg-gray-300 hover:bg-gray-400 rounded-lg"
            >
              {step === 1 ? 'Cancel' : 'Previous'}
            </button>
            <button
              onClick={step === totalSteps ? handleSubmit : nextStep}
              className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg"
            >
              {step === totalSteps ? 'Create Account' : 'Next'}
            </button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

// Step components for multi-step form
function PersonalInfoStep({ formData, setFormData }: any) {
  return (
    <div className="space-y-4">
      <h4 className="font-medium text-gray-900">Personal Information</h4>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => setFormData({...formData, firstName: e.target.value})}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => setFormData({...formData, lastName: e.target.value})}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
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
        />
      </div>
    </div>
  );
}

function AddressStep({ formData, setFormData }: any) {
  return (
    <div className="space-y-4">
      <h4 className="font-medium text-gray-900">Address Information</h4>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
        <input
          type="text"
          value={formData.address}
          onChange={(e) => setFormData({...formData, address: e.target.value})}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
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
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
          <input
            type="text"
            value={formData.zipCode}
            onChange={(e) => setFormData({...formData, zipCode: e.target.value})}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>
    </div>
  );
}

function PreferencesStep({ formData, setFormData }: any) {
  return (
    <div className="space-y-4">
      <h4 className="font-medium text-gray-900">Preferences</h4>
      <div className="space-y-3">
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={formData.newsletter}
            onChange={(e) => setFormData({...formData, newsletter: e.target.checked})}
            className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
          />
          <span className="text-sm text-gray-700">Subscribe to newsletter</span>
        </label>
        
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={formData.notifications}
            onChange={(e) => setFormData({...formData, notifications: e.target.checked})}
            className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
          />
          <span className="text-sm text-gray-700">Enable push notifications</span>
        </label>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
        <div className="grid grid-cols-2 gap-2">
          {['light', 'dark'].map((theme) => (
            <label key={theme} className="flex items-center space-x-2 p-2 border rounded cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="theme"
                value={theme}
                checked={formData.theme === theme}
                onChange={(e) => setFormData({...formData, theme: e.target.value})}
                className="text-green-600 focus:ring-green-500"
              />
              <span className="text-sm capitalize">{theme}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * iOS Keyboard-aware Form Example
 * Demonstrates proper keyboard handling on iOS
 */
function KeyboardAwareFormExample() {
  const [open, setOpen] = useState(false);
  const { keyboardHeight, isKeyboardVisible } = useKeyboardHeight({ enabled: open });

  return (
    <Drawer open={open} onOpenChange={setOpen} handleKeyboard>
      <DrawerTrigger className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded">
        iOS Keyboard Test
      </DrawerTrigger>
      <DrawerOverlay />
      <DrawerContent
        style={{
          paddingBottom: isKeyboardVisible ? keyboardHeight : undefined
        }}
      >
        <DrawerHeader>
          <h3 className="text-xl font-semibold">Keyboard Test</h3>
          <p className="text-gray-600">Test keyboard handling on iOS devices</p>
          {isKeyboardVisible && (
            <p className="text-sm text-green-600">
              Keyboard detected! Height: {keyboardHeight}px
            </p>
          )}
        </DrawerHeader>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <p className="text-sm text-gray-600">
            On iOS devices, this form will automatically adjust when the virtual keyboard appears.
          </p>
          
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <textarea
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 resize-none"
              placeholder="Additional notes..."
            />
          </div>
        </div>
        
        <DrawerFooter>
          <button
            onClick={() => setOpen(false)}
            className="w-full bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg"
          >
            Submit
          </button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

/**
 * Survey Form Example
 * Dynamic height based on survey progress
 */
function SurveyFormExample() {
  const [open, setOpen] = useState(false);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const questions = [
    "How would you rate our service?",
    "What features would you like to see improved?",
    "How likely are you to recommend us to a friend?",
    "Any additional feedback?"
  ];

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <Drawer 
      open={open} 
      onOpenChange={setOpen}
      snapPoints={['40%', '60%', '80%']}
      defaultSnapPoint={Math.min(1, Math.floor(progress / 50))}
    >
      <DrawerTrigger className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded">
        Take Survey
      </DrawerTrigger>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHandle />
        <DrawerHeader>
          <h3 className="text-xl font-semibold">Quick Survey</h3>
          <div className="mt-2">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Question {currentQuestion + 1} of {questions.length}</span>
              <span>{Math.round(progress)}% complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-indigo-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </DrawerHeader>
        
        <div className="flex-1 p-4">
          <div className="mb-6">
            <h4 className="text-lg font-medium mb-4">{questions[currentQuestion]}</h4>
            
            {currentQuestion < 2 ? (
              <div className="space-y-2">
                {['Excellent', 'Good', 'Fair', 'Poor'].map((option) => (
                  <label key={option} className="flex items-center space-x-3 p-2 border rounded cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name={`question-${currentQuestion}`}
                      value={option}
                      checked={answers[currentQuestion] === option}
                      onChange={(e) => setAnswers({...answers, [currentQuestion]: e.target.value})}
                      className="text-indigo-600 focus:ring-indigo-500"
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            ) : (
              <textarea
                rows={4}
                value={answers[currentQuestion] || ''}
                onChange={(e) => setAnswers({...answers, [currentQuestion]: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 resize-none"
                placeholder="Your answer..."
              />
            )}
          </div>
        </div>
        
        <DrawerFooter>
          <div className="flex justify-between">
            <button
              onClick={() => currentQuestion > 0 ? setCurrentQuestion(currentQuestion - 1) : setOpen(false)}
              className="px-4 py-2 text-gray-700 bg-gray-300 hover:bg-gray-400 rounded-lg"
            >
              {currentQuestion === 0 ? 'Cancel' : 'Previous'}
            </button>
            <button
              onClick={() => {
                if (currentQuestion < questions.length - 1) {
                  setCurrentQuestion(currentQuestion + 1);
                } else {
                  console.log('Survey completed:', answers);
                  alert('Thank you for your feedback!');
                  setOpen(false);
                  setCurrentQuestion(0);
                  setAnswers({});
                }
              }}
              disabled={!answers[currentQuestion]}
              className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg"
            >
              {currentQuestion === questions.length - 1 ? 'Submit' : 'Next'}
            </button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default WithFormsExample;