
import { UIProvider } from '@/context/ui'
import { darkTheme, ligthTheme } from '@/themes'
import { CssBaseline, ThemeProvider } from '@mui/material'
import type { AppProps } from 'next/app'



export default function App({ Component, pageProps }: AppProps) {
  return(
    <UIProvider>
  <ThemeProvider theme={darkTheme  }>
    <CssBaseline />
   <Component {...pageProps} />
  </ThemeProvider>
  </UIProvider>
  )
}
