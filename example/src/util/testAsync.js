
async function bar () {
  return 'bar'
}

async function foo() {
  const ret1 = await bar()
  console.info('APP: foo: ', ret1)
}

foo()