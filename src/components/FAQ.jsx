
import { useState } from "react"
import { Plus, Minus } from 'lucide-react'
import { faqData } from "../assets/data"


export const FAQ=()=> {
  const [openItems, setOpenItems] = useState([])

  const toggleItem = (index) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(item => item !== index)
        : [...prev, index]
    )
  }

  return (
    <section className="w-full py-16 px-4">
      <div className="max-w-7xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
          Flight Search & Booking Guide
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {faqData.map((faq, index) => (
            <div key={index} className="border-b border-gray-200 pb-4">
              <button
                onClick={() => toggleItem(index)}
                className="w-full flex items-center justify-between text-left py-4 group"
              >
                <span className="text-lg font-medium text-gray-900 pr-4 group-hover:text-purple-700 transition-colors">
                  {faq.question}
                </span>
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center transition-all duration-200 group-hover:bg-purple-700">
                  {openItems.includes(index) ? (
                    <Minus className="w-4 h-4 text-white" />
                  ) : (
                    <Plus className="w-4 h-4 text-white" />
                  )}
                </div>
              </button>
              
              {openItems.includes(index) && (
                <div className="pb-4 pr-12 animate-in slide-in-from-top-2 duration-200">
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-purple-600 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Our Global Flight Network
          </h3>
          <p className="text-gray-600 text-center max-w-3xl mx-auto">
            Search and compare flights from over 1,200 airlines across 190+ countries. 
            Find the best deals for domestic and international routes with our comprehensive flight search engine.
          </p>
        </div>
      </div>
    </section>
  )
}
export default FAQ;

