import Document, { Html, Head, Main, NextScript } from 'next/document'
import Navigation from '../src/components/Navigation'

class MyDocument extends Document {

  render() {
    return (
      <Html lang="en-GB" >
        <Head />
        <body>
            <Main />
            <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument