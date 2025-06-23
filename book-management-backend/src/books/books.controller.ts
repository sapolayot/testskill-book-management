import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { BooksService } from './books.service';
import { BookResponseDto } from './dto/book-response.dto';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@ApiTags('books')
@ApiBearerAuth()
@ApiBadRequestResponse({
  description: 'ข้อมูลผิดพลาด',
  schema: { example: { statusCode: 400, message: 'Invalid ID format' } },
})
@ApiUnauthorizedResponse({
  description: 'ไม่มีสิทธิ์เข้าถึง',
  schema: { example: { statusCode: 401, message: 'Unauthorized' } },
})
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  @ApiOkResponse({ type: BookResponseDto, description: 'ข้อมูลหนังสือ' })
  findAll() {
    return this.booksService.findAll();
  }

  @Get('/paginate')
  @ApiOkResponse({ type: BookResponseDto, description: 'ข้อมูลหนังสือ' })
  findAllPaginate(@Query() query: PaginationQueryDto) {
    const { page, limit } = query;
    return this.booksService.findAllPaginated(page, limit);
  }

  @Get(':id')
  @ApiOkResponse({ type: BookResponseDto, description: 'ข้อมูลหนังสือ' })
  @ApiNotFoundResponse({
    description: 'ไม่พบหนังสือ',
    schema: { example: { statusCode: 404, message: 'Book not found' } },
  })
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(id);
  }

  @Post()
  @ApiCreatedResponse({ type: BookResponseDto, description: 'ข้อมูลหนังสือ' })
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @Patch(':id')
  @ApiNotFoundResponse({
    description: 'ไม่พบหนังสือ',
    schema: { example: { statusCode: 404, message: 'Book not found' } },
  })
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(id, updateBookDto);
  }

  @Delete(':id')
  @ApiNotFoundResponse({
    description: 'ไม่พบหนังสือ',
    schema: { example: { statusCode: 404, message: 'Book not found' } },
  })
  @ApiOkResponse({
    description: 'ลบหนังสือสำเร็จ',
    schema: {
      example: { message: 'Book deleted successfully' },
    },
  })
  remove(@Param('id') id: string) {
    return this.booksService.remove(id);
  }
}
