
[![Latest version](https://deno.land/badge/npmjsq/version)](https://deno.land/x/npmjsq)

# npmjsq

**npmjsq** is a deno-powered cli npmjs.com query tool

query npmjs.com packages

## usage

to run:

```sh
deno run --allow-net 'https://deno.land/x/npmjsq/cli.ts' <npm package>
```

example:

```
deno run --allow-net 'https://deno.land/x/npmjsq/cli.ts' deno
   Packages Found   
--------------------
deno 0.1.1
...
...
```

## install

Requires [deno](https://deno.land/manual@v1.33.2/getting_started/installation)

```
deno install -n npmjsq --allow-read --allow-net https://deno.land/x/npmjsq/cli.ts
```

## license

Copyright 2023 **denobytes**.\
See [LICENCE](LICENSE) file to get more infomation.

