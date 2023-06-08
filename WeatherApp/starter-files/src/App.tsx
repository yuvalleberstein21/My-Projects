import Search from './components/Icons/Search'
import useForecast from './hooks/useForecast'
import Foreacast from './components/Icons/Foreacast'
const App = (): JSX.Element => {
  const { term, options, forecast, onInputChange, onOptionsSelect, onSubmit } =
    useForecast()

  return (
    <main className="flex justify-center items-center bg-gradient-to-br from-gray-900 to-black-400 h-[100vh] w-full">
      {forecast ? (
        <Foreacast data={forecast} />
      ) : (
        <Search
          term={term}
          options={options}
          onInputChange={onInputChange}
          onOptionsSelect={onOptionsSelect}
          onSubmit={onSubmit}
        />
      )}
    </main>
  )
}

export default App
