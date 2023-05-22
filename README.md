# 🧶 Supabase RLS in Typescript

[![Watch the video](https://i.imgur.com/PbNDm4h.png)](https://i.imgur.com/PbNDm4h.png)
[![Actual Image](https://i.imgur.com/zL7gDzO.png)](https://i.imgur.com/zL7gDzO.png)

> 📜 Helps you write Supabase Row Level Security (RLS) in Typescript. (\* plv8)

<br />

## 🚀 Usage

> New website opned!!: [https://supabase-rls.up.railway.app](https://supabase-rls.up.railway.app)

### 1. Clone And Install

```bash
git clone https://github.com/hmmhmmhm/rls-ts.git
cd ./rls-ts
npm install
```

### 2. Update Project Types

> Please read the guide and follow it to read the type of Supabase project.
> [Generating Supabase Types](https://supabase.com/docs/guides/api/rest/generating-types#generating-types-using-supabase-cli)

### 3. Create or Modify File

> Create or modify the `example.ts` file in the `./src` directory.

```ts
export default createPolicy<TABLE_NAME>((context) => {
  // TODO: Your policy logic
  return true;
});
```

> Below is an example of use.

```ts
export default createPolicy<"channels">((context) => {
  // * Allow only creators to update their own channels
  return context.row.created_by === context.auth.uid();
});
```

### 4. Build

> After entering the command below, a file is created, such as `build/example.plv8.sql`.

```bash
npm run build
```

> Copying the translated script and pasting it into the desired policy within Supabase takes effect. (Below is an example of sql file.)

```sql
-- example.ts.plv8.sql
boolean as $$
function createPolicy(cb) {
    cb({
        row: globalThis,
        function: globalThis,
        auth: globalThis.auth,
        plv8: globalThis.plv8
    });
}
return createPolicy(function(context) {
    // Allow only creators to update their own channels
    if (context.row.created_by === context.auth.uid()) return true;
});
$$ language plv8;
```

## ✅ License

> MIT Licensed.
