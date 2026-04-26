export default function Footer() {
  return (
    <footer
      className="w-full py-8 px-10 text-center text-sm"
      style={{ backgroundColor: 'var(--color-text)', color: 'var(--color-bg1)', fontFamily: 'var(--font-body)' }}
    >
      <p>© {new Date().getFullYear()} TRINOVTECH. All rights reserved.</p>
    </footer>
  );
}
