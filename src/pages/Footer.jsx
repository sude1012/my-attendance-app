function Footer() {
  return (
    <div>
      <footer
        className="bg-[#004254] w-screen text-white text-center py-4 mt-10
      xl:py-3 xl:mt-1 2xl:py-[1.75rem] 2xl:mt-10"
      >
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Indra DMA BA. All rights reserved.
        </p>
        <p className="text-xs mt-2">Made with ❤️ by Jude S. Faustino</p>
      </footer>
    </div>
  );
}

export default Footer;
