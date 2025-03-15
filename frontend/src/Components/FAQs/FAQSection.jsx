import React from 'react';
import FAQItem from './FAQItem';

const FAQSection = () => {
  const faqData = [
    {
      question: '1. What services does your agriculture drone company provide?',
      answer:
        'We provide drone spraying services for precise pesticide and fertilizer application, high-quality drone sales, and personalized training programs for farmers.',
    },
    {
      question: '2. How does drone spraying benefit my crops?',
      answer:
        'Drone spraying allows for precise application of pesticides and fertilizers, reducing waste and ensuring even coverage across your crops, which can lead to healthier plants and higher yields.',
    },
    {
      question: '3. Can I purchase drones from your company?',
      answer:
        'Yes, we offer a range of high-quality drones that are specifically designed for agricultural use. Contact us for more details on the models available.',
    },
    {
      question: '4. What makes your drones suitable for farming?',
      answer:
        'Our drones are designed with features like GPS guidance, variable rate application, and real-time data collection, making them ideal for modern farming practices.',
    },
    {
      question: '5. Do you offer training for operating the drones?',
      answer:
        'Yes, we provide comprehensive training programs to ensure that you are fully equipped to operate our drones safely and effectively.',
    },
    {
      question: '6. How long is the training program, and what does it cover?',
      answer:
        'Training duration varies, but it typically covers drone operation, maintenance, safety protocols, and integration into farming practices.',
    },
    {
      question: '7. What kind of support do you provide after purchasing a drone?',
      answer:
        'We offer ongoing technical support, including troubleshooting assistance, software updates, and access to a community of users for shared learning and best practices.',
    },
    {
      question: '8. Can your drones be used for organic farming?',
      answer:
        'Yes, our drones are compatible with organic farming practices, offering precise application methods that align with organic certification standards.',
    },
    {
      question: '9. How do your drone spraying services contribute to sustainability?',
      answer:
        'Our services reduce chemical runoff and ensure efficient use of resources, supporting more sustainable farming practices by minimizing environmental impact.',
    },
    {
      question: '10. Are your drones compatible with precision agriculture software?',
      answer:
        'Yes, our drones integrate seamlessly with various precision agriculture software, allowing for detailed data analysis and optimized farming strategies.',
    },
    {
      question: '11. What sets your company apart from other agriculture drone providers?',
      answer:
        'We differentiate ourselves through our commitment to innovation, customer support, and a deep understanding of the unique challenges faced by modern farmers.',
    },
    {
      question: '12. Can your drones be used for large-scale farming operations?',
      answer:
        'Absolutely, our drones are designed to handle large-scale farming tasks, offering the power and precision needed for extensive agricultural operations.',
    },
    {
      question: '13. How does your drone spraying service work?',
      answer:
        'Our drone spraying service involves an initial assessment of your fields, followed by customized flight paths for precise application, ensuring optimal coverage and efficiency.',
    },
    {
      question: '14. How much does your drone spraying service cost?',
      answer:
        'Costs vary based on the size of the area, type of crops, and specific needs of the farmer. Contact us for a detailed quote tailored to your requirements.',
    },
    {
      question: '15. Are there additional charges for spraying different types of crops?',
      answer:
        'Pricing may vary depending on the type of crop, the complexity of the application, and the resources required. We provide clear pricing details during our consultation.',
    },
    {
      question: '16. How long does the drone spraying service take?',
      answer:
        'The duration of the spraying service depends on the size of the field and the complexity of the task, but our efficient processes ensure timely completion.',
    },
  ];
  

  return (
    <div className=" mx-auto p-8" style={{
      marginTop:'100px',marginBottom:'200px', width:'100%'
    }}>
      <h1 className="text-4xl font-bold text-black mb-8 text-center">Frequently Asked Questions</h1>
      <div className="space-y-4">
        {faqData.map((item, index) => (
          <FAQItem
            key={index}
            question={item.question}
            answer={item.answer}
          />
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
