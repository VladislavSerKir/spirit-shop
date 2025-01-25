import { CategoryService } from './category.service';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { DeleteCategoryDto } from './dto/delete-category.dto';
import { IHeadersAuthorizationRequest, RemoveCategory } from 'src/common/types/interfaces';
import { EditCategoryDto } from './dto/edit-category.dto';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    getCategoriesInfo(): Promise<Category[]>;
    createCategory(request: IHeadersAuthorizationRequest, createCategoryDto: CreateCategoryDto): Promise<Partial<Category>>;
    editCategory(request: IHeadersAuthorizationRequest, editCategoryDto: EditCategoryDto): Promise<Partial<Category>>;
    deleteCategory(request: IHeadersAuthorizationRequest, deleteCategoryDto: DeleteCategoryDto): Promise<RemoveCategory>;
}
