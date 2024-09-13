
export default function Footer() {
    return (
        <footer className="flex items-center justify-center w-full h-16 border-t gap-5">
        <p className="text-center text-white">© {new Date().getFullYear()} Streaming Platform</p>
        <ul className="flex items-center justify-center gap-4">
            <li>
                <a
                className='text-white font-thin  hover:text-yellow-500'
                href="/">Home</a>
            </li>
        </ul>
        <ul className="flex items-center justify-center gap-4">
            <li>
                <a 
                className='text-white font-thin  hover:text-yellow-500'
                href="https://www.linkedin.com/in/aminediouane/
                ">Linkedin</a>
            </li>
            <li>
                <a 
                className='text-white font-thin  hover:text-yellow-500'
                href="https://github.com/adiouane
                ">github</a>
            </li>
            <li>
                <a 
                className='text-white font-thin  hover:text-yellow-500'
                href="https://www.instagram.com/aminediouane13
                ">Instagram</a>
            </li>
        </ul>

    </footer>
    )
}