export const useTheme = () => {
  const isDark = useCookie('theme', { sameSite: 'lax', maxAge: 60 * 60 * 24 * 7 })
  const preferredDark = usePreferredDark({ window })
  const system = computed(() => preferredDark.value ? 'dark' : 'light')

  const isDarkComputed = computed(() => {
    if (isDark.value) return isDark.value === 'dark'
    return system.value === 'dark'
  })

  return {
    isDark: isDarkComputed,
    toggleTheme() {
      isDark.value = isDark.value === 'dark' ? 'light' : 'dark'
    },
  }
}
