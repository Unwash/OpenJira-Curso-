
import { EntriesProvider } from '@/context/entries'
import { UIProvider } from '@/context/ui'
import { SnackbarProvider } from 'notistack'
import { darkTheme, ligthTheme } from '@/themes'
import { CssBaseline, ThemeProvider } from '@mui/material'
import type { AppProps } from 'next/app'



export default function App({ Component, pageProps }: AppProps) {
  return (
    <SnackbarProvider maxSnack={3}>
    <EntriesProvider>
      <UIProvider>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </UIProvider>
    </EntriesProvider>
    </SnackbarProvider>
  )
}
