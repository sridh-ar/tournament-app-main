const ApplicationName = process.env.APPLICATIONNAME || 'Demo'

export default function Footer() {
    return (
        <footer class="p-4 mt-5 bg-white md:p-8 lg:p-10 dark:bg-gray-800 w-full shadow">
            <div class="mx-auto max-w-screen-xl text-center">
                {/* <a href="#" class="flex justify-center items-center text-2xl font-semibold text-gray-900 dark:text-white">
                    <img src="/cricket.svg" alt="Tropy" className=" h-14 mx-1" />
                    {ApplicationName}
                </a> */}
                <p class="my-3 mt-0 text-gray-500 dark:text-gray-400">Register for exciting competitions, showcase your skills, and compete for glory in our upcoming events.</p>
                <ul class="flex flex-wrap justify-center items-center mb-6 text-gray-900 dark:text-white">
                    <li>
                        <a href="/support" class="mr-4 hover:underline md:mr-6 ">Contact</a>
                    </li>
                    <li>
                        <a href="/terms" class="mr-4 hover:underline md:mr-6">Terms & conditions</a>
                    </li>
                    <li>
                        <a href="/privacy" class="mr-4 hover:underline md:mr-6 ">Privacy policy</a>
                    </li>
                    <li>
                        <a href="/cancellation-refund" class="mr-4 hover:underline md:mr-6">Cancellation & Refund Policy</a>
                    </li>
                </ul>
                <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024-2025 <a href="/" class="hover:underline">{ApplicationName}™</a>. All Rights Reserved.</span>
            </div>
        </footer>
    );
};