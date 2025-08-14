"use client"

import type React from "react"

import { useState } from "react"
import { X, MessageCircle, Phone, Mail, FileText, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const helpTopics = [
  {
    id: 1,
    title: "Order Issues",
    description: "Problems with your current or past orders",
    icon: FileText,
  },
  {
    id: 2,
    title: "Payment & Refunds",
    description: "Payment failures, refund status, billing",
    icon: Phone,
  },
  {
    id: 3,
    title: "Account & Profile",
    description: "Login issues, profile updates, account settings",
    icon: MessageCircle,
  },
  {
    id: 4,
    title: "Restaurant & Menu",
    description: "Restaurant information, menu items, availability",
    icon: FileText,
  },
]

const faqs = [
  {
    question: "How do I track my order?",
    answer: "You can track your order in real-time from the 'My Orders' section in your account.",
  },
  {
    question: "What if my food arrives cold?",
    answer: "Contact our support team immediately. We'll arrange a replacement or full refund.",
  },
  {
    question: "How do I cancel my order?",
    answer: "Orders can be cancelled within 2 minutes of placing. Go to 'My Orders' and click cancel.",
  },
  {
    question: "Do you deliver in my area?",
    answer: "Enter your location in the app to check if we deliver to your area.",
  },
]

interface HelpModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function HelpModal({ isOpen, onClose }: HelpModalProps) {
  const [activeTab, setActiveTab] = useState<"topics" | "contact" | "faq">("topics")
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    alert("Your message has been sent! We'll get back to you soon.")
    setContactForm({ name: "", email: "", subject: "", message: "" })
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <div>
              <h2 className="text-2xl font-bold font-poppins">Help & Support</h2>
              <p className="text-blue-100 mt-1">We're here to help you 24/7</p>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-white/20">
              <X className="w-5 h-5" />
            </Button>
          </div>

          <div className="flex h-[70vh]">
            {/* Sidebar */}
            <div className="w-1/3 border-r bg-gray-50 p-6">
              <div className="space-y-2">
                <button
                  onClick={() => setActiveTab("topics")}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    activeTab === "topics" ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100"
                  }`}
                >
                  <div className="font-semibold">Help Topics</div>
                  <div className="text-sm text-gray-600">Browse common issues</div>
                </button>
                <button
                  onClick={() => setActiveTab("faq")}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    activeTab === "faq" ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100"
                  }`}
                >
                  <div className="font-semibold">FAQ</div>
                  <div className="text-sm text-gray-600">Frequently asked questions</div>
                </button>
                <button
                  onClick={() => setActiveTab("contact")}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    activeTab === "contact" ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100"
                  }`}
                >
                  <div className="font-semibold">Contact Us</div>
                  <div className="text-sm text-gray-600">Send us a message</div>
                </button>
              </div>

              {/* Quick Contact */}
              <div className="mt-8 p-4 bg-white rounded-lg border">
                <h3 className="font-semibold mb-3">Quick Contact</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-blue-500" />
                    <span>1800-123-4567</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-blue-500" />
                    <span>help@shwikky.com</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 p-6 overflow-y-auto">
              {activeTab === "topics" && (
                <div>
                  <h3 className="text-xl font-bold mb-4 font-poppins">How can we help you?</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {helpTopics.map((topic) => {
                      const IconComponent = topic.icon
                      return (
                        <Card
                          key={topic.id}
                          className="p-4 hover:shadow-lg transition-shadow cursor-pointer border border-gray-200"
                        >
                          <div className="flex items-start space-x-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                              <IconComponent className="w-5 h-5 text-blue-600" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900">{topic.title}</h4>
                              <p className="text-sm text-gray-600 mt-1">{topic.description}</p>
                            </div>
                            <ChevronRight className="w-4 h-4 text-gray-400" />
                          </div>
                        </Card>
                      )
                    })}
                  </div>
                </div>
              )}

              {activeTab === "faq" && (
                <div>
                  <h3 className="text-xl font-bold mb-4 font-poppins">Frequently Asked Questions</h3>
                  <div className="space-y-4">
                    {faqs.map((faq, index) => (
                      <Card key={index} className="p-4 border border-gray-200">
                        <h4 className="font-semibold text-gray-900 mb-2">{faq.question}</h4>
                        <p className="text-gray-600">{faq.answer}</p>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "contact" && (
                <div>
                  <h3 className="text-xl font-bold mb-4 font-poppins">Send us a message</h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <Input
                          value={contactForm.name}
                          onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <Input
                          type="email"
                          value={contactForm.email}
                          onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                      <Input
                        value={contactForm.subject}
                        onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                      <Textarea
                        rows={4}
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        required
                      />
                    </div>
                    <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white">
                      Send Message
                    </Button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>
    </>
  )
}
