package com.springreact.template.db;

import com.querydsl.core.types.dsl.StringExpression;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.querydsl.binding.QuerydslBinderCustomizer;
import org.springframework.data.querydsl.binding.QuerydslBindings;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RestResource;

import java.util.Collection;

public interface UserRepository extends PagingAndSortingRepository<User, Long>,
        QuerydslPredicateExecutor<User>,
        QuerydslBinderCustomizer<QUser> {

    @Override
    default void customize(QuerydslBindings bindings, QUser user) {
        // ?email=value
        bindings.bind(user.email).first(StringExpression::containsIgnoreCase);
    }

    @RestResource(exported = false)
    @Query(value = "SELECT u FROM User u WHERE u.email = :email")
    User findUserByEmail(
            @Param("email") String email
    );

    @Override
    @RestResource(exported = false)
    <S extends User> S save(S var1);

    @Override
    @RestResource(exported = false)
    <S extends User> Iterable<S> saveAll(Iterable<S> var1);

    @Override
    @RestResource(exported = false)
    boolean existsById(Long var1);

    //Iterable<T> findAll(); // GET /api/users
    //Iterable<T> findAll(Sort var1);
    //Page<T> findAll(Pageable var1);
    //Iterable<T> findAllById(Iterable<ID> var1);

    //long count();

    @Override
    @RestResource(exported = false)
    void deleteById(Long var1);

    @Override
    @RestResource(exported = false)
    void delete(User var1);

    @Override
    @RestResource(exported = false)
    void deleteAll(Iterable<? extends User> var1);

    @Override
    @RestResource(exported = false)
    void deleteAll();
}
