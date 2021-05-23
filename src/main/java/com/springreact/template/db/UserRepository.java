package com.springreact.template.db;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RestResource;

public interface UserRepository extends PagingAndSortingRepository<User, Long> {

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

    //Optional<T> findById(ID var1); // GET /api/users/1

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
