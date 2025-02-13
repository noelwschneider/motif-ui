# layouts module

This module is intended for global components (navbars, footers, etc.) and components with unique routes in the AppRouter.

## styling

CSS rulesets should ideally be minimal. They should focus on container-level layout/spacing. Ideally, they could share a single stylesheet with a single rule for each component's outermost element.

## logic

Component logic should mostly pertain to context providers.

Particularly isolated components (login, register, 404, etc.) are more likely to include more involved logic to prevent spilling unnecessarily through the file structure.
