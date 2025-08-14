"use client"

import type React from "react"
import { useState } from "react"
import { X, MessageCircle, Phone, Mail, FileText, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const helpTopics = [
  { id: 1, title: "Order Issues", description: "Problems with your current or past orders", icon: FileText },
  { id: 2, title: "Payment & Refunds", description: "Payment failures, refund status, billing", icon: Phone },
  { id: 3, title: "Account & Profile", description: "Login issues, profile updates, account settings", icon: MessageCircle },
  { id: 4, title: "Restaurant & Menu", description: "Restaurant information, menu items, availability", icon: FileText },
]

const faqs = [
  { question: "How do I track my order?", answer: "You can track your order in real-time from the 'My Orders' section in your account." },
  { question: "What if my food arrives cold?", answer: "Contact our support team immediately. We'll arrange a replacement or full refund." },
  { question: "How do I cancel my order?", answer: "Orders can be cancelled within 2 minutes of placing. Go to 'My Orders' and click cancel." },
  { question: "Do you deliver in my area?", answer: "Enter your location in the app to check if we deliver to your area." },
]

interface HelpModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function HelpModal({ isOpen, onClose }: HelpModalProps) {
  const [activeTab, setActiveTab] = useState<"topics" | "contact" | "faq">("topics")
  const [contactForm, setContactForm] = useState({ name: "", email: "", subject: "", message: "" })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Your message has been sent! We'll get back to you soon.")
    setContactForm({ name: "", email: "", subject: "", message: "" })
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 z-50 transition-opacity" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-4xl max-h-[90vh] bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-2xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b dark:border-gray-800 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <div>
              <h2 className="text-2xl font-bold font-poppins">Help & Support</h2>
              <p className="text-blue-100 mt-1">We're here to help you 24/7</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white hover:bg-white/20 focus:ring-2 focus:ring-blue-300/40"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          <div className="flex h-[70vh]">
            {/* Sidebar */}
            <div className="w-1/3 border-r dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-6">
              <div className="space-y-2">
                {[
                  { key: "topics", title: "Help Topics", subtitle: "Browse common issues" },
                  { key: "faq", title: "FAQ", subtitle: "Frequently asked questions" },
                  { key: "contact", title: "Contact Us", subtitle: "Send us a message" },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key as "topics" | "faq" | "contact")}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      activeTab === tab.key
                        ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                        : "hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    <div className="font-semibold">{tab.title}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{tab.subtitle}</div>
                  </button>
                ))}
              </div>

              {/* Quick Contact */}
              <div className="mt-8 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold mb-3">Quick Contact</h3>
                <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                    <span>1800-123-4567</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-blue-500 dark:text-blue-400" />
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
                          className="p-4 hover:shadow-lg transition-shadow cursor-pointer border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
                        >
                          <div className="flex items-start space-x-3">
                            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                              <IconComponent className="w-5 h-5 text-blue-600 dark:text-blue-300" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900 dark:text-gray-100">{topic.title}</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{topic.description}</p>
                            </div>
                            <ChevronRight className="w-4 h-4 text-gray-400 dark:text-gray-400" />
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
                      <Card
                        key={index}
                        className="p-4 border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
                      >
                        <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">{faq.question}</h4>
                        <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
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
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                        <Input
                          value={contactForm.name}
                          onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                          required
                          className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-600"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                        <Input
                          type="email"
                          value={contactForm.email}
                          onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                          required
                          className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-600"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject</label>
                      <Input
                        value={contactForm.subject}
                        onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                        required
                        className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-600"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
                      <Textarea
                        rows={4}
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        required
                        className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-600"
                      />
                    </div>
                    <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white dark:text-gray-100">
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
