

const NewsSetter = () => {
  return (
  
    <section className="py-12 bg-green-500 text-white">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Updated on New Releases</h2>
            <p className="text-xl mb-6 max-w-2xl mx-auto">Subscribe to our newsletter for book recommendations, author events, and exclusive offers.</p>
            <form className="max-w-md mx-auto flex">
                <input type="email" placeholder="Your email address" className="flex-grow px-4 py-3 rounded-l-md focus:outline-none text-gray-900" />
                <button type="submit" className="px-6 py-3 bg-green-700 hover:bg-green-800 rounded-r-md transition font-medium">Subscribe</button>
            </form>
        </div>
    </section>
  )
}

export default NewsSetter