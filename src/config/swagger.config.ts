import { DocumentBuilder } from '@nestjs/swagger';

export const config = new DocumentBuilder()
  .setTitle('API CRUD Tasks')
  .setDescription(
    'En esta API tendremos el CRUD de Tareas, actualmente se encuentra sin base de datos.',
  )
  .setVersion('1.0')
  .build();
