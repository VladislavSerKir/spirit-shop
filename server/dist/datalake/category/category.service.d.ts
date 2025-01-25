import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { DeleteCategoryDto } from './dto/delete-category.dto';
import { RemoveCategory } from 'src/common/types/interfaces';
import { EditCategoryDto } from './dto/edit-category.dto';
import { UsersService } from '../user/users.service';
export declare class CategoryService {
    private readonly usersService;
    private categoryRepo;
    constructor(usersService: UsersService, categoryRepo: Repository<Category>);
    getAllCategories(): Promise<Category[]>;
    createCategory(createCategoryDto: CreateCategoryDto, accessToken: string): Promise<Partial<Category>>;
    editCategory(editCategoryDto: EditCategoryDto, accessToken: string): Promise<Partial<Category>>;
    deleteCategory(deleteCategoryDto: DeleteCategoryDto, accessToken: string): Promise<RemoveCategory>;
}
