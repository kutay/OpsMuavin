import 'https://deno.land/std@0.208.0/dotenv/load.ts'

// console.log(Deno.env.toObject())

export function get (key: string) {
  return Deno.env.get(key)
}
