const validatePassword = (str) => {
  const caracteresEspeciales = "!@#$%^&*()_+-=[]{}|;:',.<>/?`~"
  for (let i = 0; i < str.length; i++) {
    if (caracteresEspeciales.includes(str[i])) return true
  }
  return false
}

export { validatePassword }