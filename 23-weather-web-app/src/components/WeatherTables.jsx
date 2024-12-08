import { translateDescription } from "../utils/api"
import { getWeatherIcon } from "../utils/weatherIcons"

function WeatherTables({ hoursPast, hoursFuture }) {
  const renderTable = (title, hours) => (
    <div className="rounded-xl p-4 shadow-lg mb-8">
      <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
      <div className="overflow-x-auto max-w-full">
        <table className="table-auto w-full text-left border-collapse">
          <thead>
            <tr className="bg-purple-700 text-white">
              <th className="border border-blue-300 px-4 py-2">Hora</th>
              <th className="border border-blue-300 px-4 py-2">
                Temperatura (°C)
              </th>
              <th className="border border-blue-300 px-4 py-2">Condiciones</th>
            </tr>
          </thead>
          <tbody>
            {hours.map((hour, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-blue-900/20" : "bg-blue-900/10"
                } hover:bg-blue-700/30`}
              >
                <td className="border border-blue-300 px-4 py-2 text-white">
                  {hour.datetime}
                </td>
                <td className="border border-blue-300 px-4 py-2 text-white flex gap-2 items-center">
                  {getWeatherIcon(translateDescription(hour.conditions))}
                  {hour.temp}°C
                </td>
                <td className="border border-blue-300 px-4 py-2 text-white">
                  {translateDescription(hour.conditions)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  return (
    <div className="container mx-auto px-4 mt-6 space-y-8">
      {renderTable("Últimas 24 horas", hoursPast)}
      {renderTable("Próximas 24 horas", hoursFuture)}
    </div>
  )
}

export default WeatherTables
