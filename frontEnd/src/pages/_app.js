import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <div className="flex justify-center">
      <Component {...pageProps} />
    </div>
  );
}
