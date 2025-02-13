# hooks

The current 'hooks' pattern is used to apply complex logic in the form of a single hook instance.

Most hooks should be imported to UI components via the '_hooks' file, which exports the final intended version of each hook as a context.

The inidividual files are for defining the logic to be used by these contexts.


## dev note

This pattern seems unconventional, and obviously has some potential to create problems when I want reusable/modularized logic. It might just mean renaming things, or it could mean a bigger overhaul. For now, this approach seems to cover my current needs/