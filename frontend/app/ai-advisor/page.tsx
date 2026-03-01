"use client"

import { useState, useRef, useEffect, Fragment } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import useToast from "@/hooks/use-toast"
import {
  Send,
  Bot,
  User,
  Loader2,
  FileText,
  MessageSquareQuote,
  RefreshCcw,
  BookCheck,
  ArrowLeft,
  Sparkles,
  Brain,
  Target,
  Zap,
  CheckCircle,
  Clock,
} from "lucide-react"

// --- Constants ---
const API_BASE_URL = process.env.NEXT_PUBLIC_AI_ADVISOR_API_URL || "http://localhost:5274/api"

// --- Type Definitions ---
interface Message {
  role: "user" | "assistant" | "system"
  content: string
}

interface Question {
  question: string
  options: string[]
  answer: string
  explanation: string
}

interface Quiz {
  questions: Question[]
}

// --- Main Component ---
export default function AIAdvisorPage() {
  const toast = useToast

  // --- State Management ---
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [view, setView] = useState<"chat" | "quiz">("chat")

  // Chat State
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! I'm your AI Learning Advisor specializing in Machine Learning. Upload a document or ask me a question, and I can generate an ML quiz to test your knowledge.",
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Quiz State
  const [quiz, setQuiz] = useState<Quiz | null>(null)
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({})
  const [showResults, setShowResults] = useState(false)
  const [score, setScore] = useState(0)

  // --- Effects ---
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  // --- API Handlers ---
  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return
    const messageContent = inputMessage
    setInputMessage("")

    const userMessage: Message = { role: "user", content: messageContent }
    setMessages((prev) => [...prev, userMessage])
    setIsTyping(true)

    // Simulate network delay
    setTimeout(() => {
      // Hardcoded ML response
      const mlResponse = "That's an interesting question about Machine Learning! In ML, determining the right approach often depends on whether your data is labeled (Supervised Learning), unlabeled (Unsupervised Learning), or focused on maximizing a reward (Reinforcement Learning). Let me know if you want to dive deeper into any of these areas or test your knowledge with a quiz!"

      setMessages((prev) => [...prev, { role: "assistant", content: mlResponse }])
      setIsTyping(false)
    }, 1500)
  }

  const handleGenerateQuiz = async () => {
    setIsTyping(true)
    toast.info("Generating Quiz... Creating a Machine Learning quiz based on your uploaded document.")

    // Simulate network delay
    setTimeout(() => {
      // Hardcoded 10-question ML quiz
      const hardcodedQuiz: Quiz = {
        questions: [
          {
            question: "What is Supervised Learning?",
            options: [
              "Training with labeled data",
              "Training without labeled data",
              "Learning through rewards",
              "Filtering unneeded data"
            ],
            answer: "0",
            explanation: "Supervised learning uses labeled datasets to train algorithms to classify data or predict outcomes accurately."
          },
          {
            question: "Which of the following is an example of Unsupervised Learning?",
            options: [
              "Predicting housing prices",
              "Spam email detection",
              "Customer segmentation (clustering)",
              "A chess-playing AI"
            ],
            answer: "2",
            explanation: "Clustering (like customer segmentation) is unsupervised because it finds hidden patterns or groupings in unlabeled data."
          },
          {
            question: "What problem does 'Overfitting' describe in Machine Learning?",
            options: [
              "When a model predicts perfectly on new data",
              "When a model learns the training data too well, capturing noise",
              "When a model is too simple to capture patterns",
              "When you have too much data"
            ],
            answer: "1",
            explanation: "Overfitting occurs when a model is too complex and learns the noise in the training data, hurting its performance on new, unseen data."
          },
          {
            question: "Which algorithm is commonly used for Classification problems?",
            options: [
              "Linear Regression",
              "K-Means",
              "Logistic Regression",
              "Principal Component Analysis (PCA)"
            ],
            answer: "2",
            explanation: "Despite its name, Logistic Regression is used for binary classification, not regression."
          },
          {
            question: "What is the purpose of 'Gradient Descent'?",
            options: [
              "To increase the learning rate",
              "To minimize the loss (or error) function",
              "To clean missing data",
              "To visualize high-dimensional data"
            ],
            answer: "1",
            explanation: "Gradient descent is an optimization algorithm used to find the parameters that minimize a cost function."
          },
          {
            question: "In Reinforcement Learning, what is the goal of the 'Agent'?",
            options: [
              "To label the data correctly",
              "To maximize the cumulative reward",
              "To cluster similar environments together",
              "To reduce the dimensionality of the state"
            ],
            answer: "1",
            explanation: "The agent learns to make decisions by performing actions that maximize its total cumulative reward over time."
          },
          {
            question: "Which metric is best for evaluating a classifier on highly imbalanced data?",
            options: [
              "Accuracy",
              "Mean Squared Error (MSE)",
              "F1 Score (Precision & Recall)",
              "R-squared"
            ],
            answer: "2",
            explanation: "F1 Score is preferred for imbalanced datasets because Accuracy can be misleading if the majority class is overwhelmingly large."
          },
          {
            question: "What is a Neural Network 'Epoch'?",
            options: [
              "One forward pass of a single image",
              "One complete pass through the entire training dataset",
              "The activation function of a neuron",
              "The process of updating weights once"
            ],
            answer: "1",
            explanation: "An epoch means the learning algorithm has seen the entire training dataset exactly one time."
          },
          {
            question: "What technique randomly drops neurons during training to prevent overfitting?",
            options: [
              "Batch Normalization",
              "Data Augmentation",
              "Early Stopping",
              "Dropout"
            ],
            answer: "3",
            explanation: "Dropout is a regularization technique where randomly selected neurons are ignored during training to make the network more robust."
          },
          {
            question: "Which component of an NLP model converts text words into numerical vectors?",
            options: [
              "Word Embeddings (e.g., Word2Vec)",
              "Softmax Layer",
              "Pooling Layer",
              "Gradient Clipping"
            ],
            answer: "0",
            explanation: "Word embeddings map words to continuous vector spaces, capturing semantic meanings and relationships."
          }
        ]
      }

      setQuiz(hardcodedQuiz)
      setUserAnswers({})
      setShowResults(false)
      setScore(0)
      setView("quiz")
      setIsTyping(false)
    }, 2000)
  }

  const handleSubmitQuiz = () => {
    let correctAnswers = 0
    quiz?.questions.forEach((q, index) => {
      // Compare user's answer (string index) to correct answer
      if (userAnswers[index] === q.answer) {
        correctAnswers++
      }
    })
    setScore(correctAnswers)
    setShowResults(true)

    // Hardcoded message
    const feedbackMsg = correctAnswers >= 8
      ? "Outstanding ML knowledge! You're ready to build AI."
      : correctAnswers >= 5
        ? "Good job! You have a solid foundation in Machine Learning."
        : "Keep studying! Machine Learning is complex but you'll get there!"

    toast.success(`You scored ${correctAnswers} out of 10! ${feedbackMsg}`)
  }

  const resetQuiz = () => {
    setUserAnswers({})
    setShowResults(false)
    setScore(0)
  }

  // --- Render Methods ---
  const renderChatView = () => (
    <div className="space-y-4">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <Brain className="h-5 w-5 text-slate-600" />
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
            LearnLens
          </h1>
        </div>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Ask questions about any topic, get detailed explanations, and test your knowledge with AI-generated quizzes.
        </p>
      </div>

      {/* Chat Interface */}
      <Card className="h-[70vh] flex flex-col bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
        <CardHeader className="border-b border-slate-200 dark:border-slate-700 pb-3 flex-shrink-0">
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2 text-slate-800 dark:text-slate-200">
              <MessageSquareQuote className="h-4 w-4 text-slate-600" />
              <span>AI Learning Advisor</span>
            </CardTitle>
            <Button
              onClick={handleGenerateQuiz}
              disabled={isTyping || messages.length <= 1}
              className="bg-slate-800 hover:bg-slate-700 dark:bg-slate-200 dark:text-slate-800 dark:hover:bg-slate-300 text-xs"
            >
              <BookCheck className="mr-1 h-3 w-3" />
              Generate Quiz
            </Button>
          </div>
          <CardDescription className="text-slate-600 dark:text-slate-400 text-sm">
            Ask questions about a topic, and then start a quiz when you're ready to test your knowledge.
          </CardDescription>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
          <ScrollArea className="flex-1 p-4 h-full">
            <div className="space-y-4 min-h-full">
              {messages.map((msg, index) => (
                <div key={index} className={`flex items-start gap-3 ${msg.role === "user" ? "justify-end" : ""}`}>
                  {msg.role === "assistant" && (
                    <Avatar className="w-8 h-8 border border-slate-200 dark:border-slate-600 flex-shrink-0">
                      <AvatarFallback className="bg-slate-600 text-white">
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}

                  <div className={`max-w-lg rounded-lg px-4 py-2 ${msg.role === "user"
                    ? "bg-slate-800 text-white dark:bg-slate-200 dark:text-slate-800"
                    : "bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200"
                    }`}>
                    <p className="text-sm whitespace-pre-wrap leading-relaxed break-words">{msg.content}</p>
                  </div>

                  {msg.role === "user" && (
                    <Avatar className="w-8 h-8 border border-slate-200 dark:border-slate-600 flex-shrink-0">
                      <AvatarFallback className="bg-slate-500 text-white">
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex items-start gap-3">
                  <Avatar className="w-8 h-8 border border-slate-200 dark:border-slate-600 flex-shrink-0">
                    <AvatarFallback className="bg-slate-600 text-white">
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-slate-100 dark:bg-slate-700 rounded-lg px-4 py-2">
                    <div className="flex items-center space-x-2">
                      <Loader2 className="h-3 w-3 animate-spin text-slate-600" />
                      <span className="text-sm text-slate-600 dark:text-slate-400">AI is thinking...</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Invisible div to scroll to */}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="border-t border-slate-200 dark:border-slate-700 p-4 bg-slate-50 dark:bg-slate-700 flex-shrink-0">
            <div className="flex space-x-3">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Ask me anything about a topic..."
                className="flex-1 border-slate-200 dark:border-slate-600 focus:border-slate-400 dark:focus:border-slate-500 bg-white dark:bg-slate-800"
                disabled={isTyping}
              />
              <Button
                onClick={handleSendMessage}
                disabled={isTyping || !inputMessage.trim()}
                className="bg-slate-800 hover:bg-slate-700 dark:bg-slate-200 dark:text-slate-800 dark:hover:bg-slate-300"
              >
                <Send className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderQuizView = () => (
    <div className="space-y-4">
      {/* Quiz Header */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <BookCheck className="h-5 w-5 text-slate-600" />
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
            Knowledge Quiz
          </h1>
        </div>
        <p className="text-slate-600 dark:text-slate-400">
          Test your understanding of the topic
        </p>
      </div>

      {quiz && (
        <Card className="h-[70vh] flex flex-col bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          <CardHeader className="border-b border-slate-200 dark:border-slate-700 pb-3 flex-shrink-0">
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2 text-slate-800 dark:text-slate-200">
                <Target className="h-4 w-4 text-slate-600" />
                <span>Quiz Questions</span>
              </CardTitle>
              <div className="flex items-center space-x-3">
                <div className="text-xs text-slate-600 dark:text-slate-400">
                  {Object.keys(userAnswers).length} / {quiz.questions.length} answered
                </div>
                <Button
                  onClick={() => setView("chat")}
                  variant="outline"
                  size="sm"
                  className="border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700"
                >
                  <ArrowLeft className="mr-1 h-3 w-3" />
                  Back to Chat
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="flex-1 p-0 overflow-hidden">
            <ScrollArea className="h-full p-4">
              {showResults ? (
                <div className="space-y-4">
                  {/* Results Summary */}
                  <div className="text-center py-6">
                    <div className="w-16 h-16 bg-slate-800 dark:bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-lg font-bold text-white dark:text-slate-800">{score}/{quiz.questions.length}</span>
                    </div>
                    <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-1">
                      Quiz Complete!
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                      You scored {score} out of {quiz.questions.length} questions correctly.
                    </p>
                    <div className="mt-3 space-x-2">
                      <Button
                        onClick={resetQuiz}
                        className="bg-slate-800 hover:bg-slate-700 dark:bg-slate-200 dark:text-slate-800 dark:hover:bg-slate-300 text-xs"
                      >
                        <RefreshCcw className="mr-1 h-3 w-3" />
                        Retake Quiz
                      </Button>
                      <Button
                        onClick={() => setView("chat")}
                        variant="outline"
                        size="sm"
                        className="border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700"
                      >
                        Back to Chat
                      </Button>
                    </div>
                  </div>

                  {/* Question Review */}
                  <div className="space-y-4">
                    {quiz.questions.map((question, index) => (
                      <Card key={index} className="border border-slate-200 dark:border-slate-700">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm text-slate-800 dark:text-slate-200">
                            Question {index + 1}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <p className="text-slate-700 dark:text-slate-300 text-sm font-medium">
                            {question.question}
                          </p>

                          <div className="space-y-2">
                            {question.options.map((option, optionIndex) => (
                              <div
                                key={optionIndex}
                                className={`p-2 rounded border transition-colors ${userAnswers[index] === option
                                  ? option === question.answer
                                    ? "bg-emerald-50 border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-800"
                                    : "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800"
                                  : option === question.answer
                                    ? "bg-emerald-50 border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-800"
                                    : "bg-slate-50 border-slate-200 dark:bg-slate-700 dark:border-slate-600"
                                  }`}
                              >
                                <div className="flex items-center space-x-2">
                                  {option === question.answer ? (
                                    <CheckCircle className="h-3 w-3 text-emerald-500" />
                                  ) : userAnswers[index] === option ? (
                                    <div className="h-3 w-3 rounded-full border border-red-500 bg-red-500"></div>
                                  ) : (
                                    <div className="h-3 w-3 rounded-full border border-slate-300 dark:border-slate-600"></div>
                                  )}
                                  <span className={`text-xs font-medium ${option === question.answer
                                    ? "text-emerald-700 dark:text-emerald-400"
                                    : userAnswers[index] === option
                                      ? "text-red-700 dark:text-red-400"
                                      : "text-slate-700 dark:text-slate-300"
                                    }`}>
                                    {option}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded p-3">
                            <h4 className="font-medium text-slate-800 dark:text-slate-200 mb-1 flex items-center space-x-1 text-xs">
                              <Brain className="h-3 w-3" />
                              <span>Explanation</span>
                            </h4>
                            <p className="text-xs text-slate-600 dark:text-slate-400">
                              {question.explanation}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {quiz.questions.map((question, index) => (
                    <Card key={index} className="border border-slate-200 dark:border-slate-700">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm text-slate-800 dark:text-slate-200">
                          Question {index + 1} of {quiz.questions.length}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <p className="text-slate-700 dark:text-slate-300 text-sm font-medium">
                          {question.question}
                        </p>

                        <RadioGroup
                          value={userAnswers[index] || ""}
                          onValueChange={(value) => setUserAnswers({ ...userAnswers, [index]: value })}
                          className="space-y-2"
                        >
                          {question.options.map((option, optionIndex) => (
                            <div key={optionIndex} className="flex items-center space-x-2">
                              <RadioGroupItem value={option} id={`q${index}-${optionIndex}`} />
                              <Label
                                htmlFor={`q${index}-${optionIndex}`}
                                className="flex-1 cursor-pointer p-2 rounded border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-sm"
                              >
                                {option}
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </CardContent>
                    </Card>
                  ))}

                  <div className="flex justify-center pt-4 pb-4">
                    <Button
                      onClick={handleSubmitQuiz}
                      disabled={Object.keys(userAnswers).length < quiz.questions.length}
                      className="bg-slate-800 hover:bg-slate-700 dark:bg-slate-200 dark:text-slate-800 dark:hover:bg-slate-300"
                    >
                      <CheckCircle className="mr-2 h-3 w-3" />
                      Submit Quiz
                    </Button>
                  </div>
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      )}
    </div>
  )

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {view === "chat" ? renderChatView() : renderQuizView()}
      </div>
    </div>
  )
}