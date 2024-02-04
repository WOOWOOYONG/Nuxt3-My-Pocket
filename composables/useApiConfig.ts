export const useApiConfig = () => {
  const runtimeConfig = useRuntimeConfig()
  const apiBaseUrl = runtimeConfig.public.apiBaseUrl
  return {
    apiBaseUrl
  }
}
