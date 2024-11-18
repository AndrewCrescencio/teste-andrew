import type { Router } from 'vue-router'
import type { RouteNamedMap } from 'vue-router/auto-routes' // Tipos gerados automaticamente pelo unplugin-vue-router
import { useRouter } from 'vue-router'

export function useNavigate() {
  const router: Router = useRouter()

  /**
   * Navega para uma rota específica com parâmetros de consulta opcionais.
   * @param routeName - Nome da rota gerada pelo `unplugin-vue-router`.
   * @param queryParams - Objeto opcional com parâmetros de consulta.
   */
  const navigate = <T extends keyof RouteNamedMap>(
    routeName: T,
    queryParams?: Record<string, any>,
  ) => {
    const routeData = router.resolve({
      name: routeName,
      query: queryParams,
    })
    router.push(routeData)
  }

  const goBack = () => {
    router.back()
  }

  return {
    navigate,
    goBack,
  }
}
