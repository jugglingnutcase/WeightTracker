Param(
  [switch]$production
)

if (-not $production) {
  $env:NODE_ENV = 'development'
}

& npm.cmd start
