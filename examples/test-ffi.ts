import {
  vigem_alloc,
  vigem_connect,
  vigem_target_add,
  vigem_target_x360_alloc,
} from '../src/ffi';

const client = vigem_alloc();
if (client !== null) {
  const err = vigem_connect(client);
  console.log(err.toString(16));

  const pad = vigem_target_x360_alloc();
  if (pad !== null) {
    const err = vigem_target_add(client, pad);
    console.log(err.toString(16));
  }
}
